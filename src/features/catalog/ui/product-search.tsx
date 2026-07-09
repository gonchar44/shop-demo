"use client";

import { useState, useRef, useEffect, useId, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRightIcon, SearchIcon, XIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/shared/lib/utils";
import { useClickOutside } from "@/shared/lib/use-click-outside";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { suggestionsQueryOptions } from "@/features/catalog/api/product-queries";
import { SearchSuggestions } from "@/features/catalog/ui/search-suggestions";

type ProductSearchProps = {
    className?: string;
    autoFocus?: boolean;
};

export function ProductSearch({ className = "w-96", autoFocus = false }: ProductSearchProps = {}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const reactId = useId();
    const inputId = `product-search-${reactId}`;
    const listboxId = `search-suggestions-listbox-${reactId}`;

    const [value, setValue] = useState(searchParams.get("q") ?? "");
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        startTransition(() => {
            setValue(searchParams.get("q") ?? "");
        });
    }, [searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), 300);
        return () => clearTimeout(timer);
    }, [value]);

    useClickOutside(containerRef, () => {
        setIsOpen(false);
        setFocusedIndex(-1);
    });

    const { data, isFetching } = useQuery({
        ...suggestionsQueryOptions(debouncedValue),
        enabled: isOpen && debouncedValue.trim().length >= 2,
    });

    const products = data?.products ?? [];
    const categories = data?.categories ?? [];
    const hasResults = products.length > 0 || categories.length > 0;
    const totalItems = hasResults ? products.length + categories.length + 1 : 0;
    const showDropdown = isOpen && value.trim().length >= 2;

    function triggerSearch(currentValue: string) {
        const next = new URLSearchParams(searchParams.toString());
        const trimmed = currentValue.trim();
        if (trimmed) {
            next.set("q", trimmed);
        } else {
            next.delete("q");
        }
        next.set("page", "1");
        setIsOpen(false);
        setFocusedIndex(-1);
        router.push(`/catalog?${next.toString()}`);
    }

    function handleProductSelect(slug: string) {
        setIsOpen(false);
        setFocusedIndex(-1);
        router.push(`/product/${slug}`);
    }

    function handleCategorySelect(slug: string) {
        setIsOpen(false);
        setFocusedIndex(-1);
        const next = new URLSearchParams();
        next.set("category", slug);
        next.set("page", "1");
        router.push(`/catalog?${next.toString()}`);
    }

    function handleClear() {
        setValue("");
        setDebouncedValue("");
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerSearch("");
        inputRef.current?.focus();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Escape") {
            setIsOpen(false);
            setFocusedIndex(-1);
            return;
        }

        if (!showDropdown) {
            if (e.key === "Enter") {
                e.preventDefault();
                triggerSearch(value);
            }
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (totalItems > 0) setFocusedIndex((prev) => (prev + 1) % totalItems);
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (totalItems > 0) setFocusedIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            const seeAllIndex = products.length + categories.length;
            const clampedIndex = focusedIndex > seeAllIndex ? seeAllIndex : focusedIndex;
            if (clampedIndex < 0 || clampedIndex === seeAllIndex) {
                triggerSearch(value);
            } else if (clampedIndex < products.length) {
                handleProductSelect(products[clampedIndex].slug);
            } else {
                handleCategorySelect(categories[clampedIndex - products.length].slug);
            }
        }
    }

    return (
        <div ref={containerRef} className={cn("relative", className)} role="search" aria-label="Search products">
            <label htmlFor={inputId} className="sr-only">
                Search products
            </label>

            <div className="relative flex items-center group">
                <SearchIcon
                    className="absolute left-4 size-4 text-gray-400 pointer-events-none transition-colors duration-150 group-focus-within:text-gray-950"
                    strokeWidth={2}
                    aria-hidden={true}
                />

                <Input
                    ref={inputRef}
                    id={inputId}
                    type="search"
                    autoComplete="off"
                    spellCheck={false}
                    value={value}
                    maxLength={80}
                    autoFocus={autoFocus}
                    onChange={(e) => {
                        const v = e.target.value.slice(0, 80);
                        setValue(v);
                        setIsOpen(v.trim().length >= 2);
                        setFocusedIndex(-1);
                    }}
                    onFocus={() => {
                        if (value.trim().length >= 2) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search items…"
                    className="pl-11 pr-20 [&::-webkit-search-cancel-button]:hidden"
                    aria-autocomplete="list"
                    aria-expanded={showDropdown}
                    aria-controls={listboxId}
                />

                {value && (
                    <>
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon-sm"
                            shape="circle"
                            onClick={handleClear}
                            aria-label="Clear search"
                            className="absolute right-11 w-6 h-6 bg-gray-300 text-gray-600 hover:bg-gray-950 hover:text-white"
                        >
                            <XIcon className="size-3" strokeWidth={2.5} />
                        </Button>

                        <Button
                            type="button"
                            variant="primary"
                            size="icon-sm"
                            shape="circle"
                            onClick={() => triggerSearch(value)}
                            aria-label="Search"
                            className="absolute right-2 w-8 h-8"
                        >
                            <ArrowRightIcon className="size-4" strokeWidth={2.5} />
                        </Button>
                    </>
                )}
            </div>

            <SearchSuggestions
                id={listboxId}
                query={debouncedValue}
                products={products}
                categories={categories}
                isLoading={isFetching || value.trim() !== debouncedValue.trim()}
                isOpen={showDropdown}
                focusedIndex={focusedIndex}
                onProductSelect={handleProductSelect}
                onCategorySelect={handleCategorySelect}
                onSeeAll={() => triggerSearch(value)}
            />
        </div>
    );
}
