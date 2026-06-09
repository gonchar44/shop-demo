"use client";

import { useState, useRef, useEffect, startTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export function ProductSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [value, setValue] = useState(searchParams.get("q") ?? "");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        startTransition(() => {
            setValue(searchParams.get("q") ?? "");
        });
    }, [searchParams]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const next = new URLSearchParams(searchParams.toString());
        const trimmed = value.trim();
        if (trimmed) {
            next.set("q", trimmed);
        } else {
            next.delete("q");
        }
        next.set("page", "1");
        router.push(`${pathname}?${next.toString()}`);
    }

    function handleClear() {
        setValue("");
        const next = new URLSearchParams(searchParams.toString());
        next.delete("q");
        next.set("page", "1");
        router.push(`${pathname}?${next.toString()}`);
        inputRef.current?.focus();
    }

    return (
        <div className="w-96" role="search" aria-label="Search products">
            <label htmlFor="product-search" className="sr-only">
                Search products
            </label>

            <div className="relative flex items-center group">
                <SearchIcon
                    className="absolute left-4 size-4 text-gray-400 pointer-events-none transition-colors duration-150 group-focus-within:text-gray-950"
                    strokeWidth={2}
                    aria-hidden
                />

                <Input
                    ref={inputRef}
                    id="product-search"
                    type="search"
                    autoComplete="off"
                    spellCheck={false}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search items…"
                    className="pl-11 pr-10 [&::-webkit-search-cancel-button]:hidden"
                />

                {value && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon-sm"
                        shape="circle"
                        onClick={handleClear}
                        aria-label="Clear search"
                        className="absolute right-3 w-6 h-6 bg-gray-300 text-gray-600 hover:bg-gray-950 hover:text-white"
                    >
                        <XIcon className="size-3" strokeWidth={2.5} />
                    </Button>
                )}
            </div>
        </div>
    );
}
