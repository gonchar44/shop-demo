"use client";

import { TagIcon, ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/utils";
import type { ProductSuggestion, ProductAttribute } from "@/features/catalog/model/product.types";
import { Button } from "@/shared/ui/button";
import { ProductSuggestionItem } from "@/features/catalog/ui/product-suggestion-item";
import { SearchSuggestionsSkeleton } from "@/features/catalog/ui/search-suggestions-skeleton";

type SearchSuggestionsProps = {
    id?: string;
    query: string;
    products: ProductSuggestion[];
    categories: ProductAttribute[];
    isLoading: boolean;
    isOpen: boolean;
    focusedIndex: number;
    onProductSelect: (slug: string) => void;
    onCategorySelect: (slug: string) => void;
    onSeeAll: () => void;
};

export function SearchSuggestions({
    id,
    query,
    products,
    categories,
    isLoading,
    isOpen,
    focusedIndex,
    onProductSelect,
    onCategorySelect,
    onSeeAll,
}: SearchSuggestionsProps) {
    const hasResults = products.length > 0 || categories.length > 0;
    const seeAllIndex = products.length + categories.length;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    id={id}
                    role="listbox"
                    aria-label="Search suggestions"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50"
                >
                    {isLoading ? (
                        <SearchSuggestionsSkeleton />
                    ) : !hasResults ? (
                        <p className="px-4 py-6 text-sm text-gray-400 text-center">
                            No results for &ldquo;{query}&rdquo;
                        </p>
                    ) : (
                        <>
                            {products.length > 0 && (
                                <ul className="p-1">
                                    {products.map((product, index) => (
                                        <li key={product.id}>
                                            <ProductSuggestionItem
                                                product={product}
                                                isFocused={focusedIndex === index}
                                                onSelect={onProductSelect}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {categories.length > 0 && (
                                <div className={cn("px-3 py-2.5", products.length > 0 && "border-t border-gray-100")}>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                                        Browse by category
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {categories.map((category, index) => {
                                            const itemIndex = products.length + index;
                                            return (
                                                <Button
                                                    className={cn("h-7", focusedIndex === itemIndex && "bg-gray-950 text-white")}
                                                    variant="secondary"
                                                    size="sm"
                                                    role="option"
                                                    aria-selected={focusedIndex === itemIndex}
                                                    onClick={() => onCategorySelect(category.slug)}
                                                    key={category.id + "_new"}
                                                >
                                                    <TagIcon className="size-3" strokeWidth={2} />
                                                    {category.name}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-gray-100 p-1">
                                <Button
                                    variant="ghost"
                                    size="md"
                                    className={cn("w-full", focusedIndex === seeAllIndex && "bg-gray-100")}
                                    role="option"
                                    aria-selected={focusedIndex === seeAllIndex}
                                    onClick={onSeeAll}
                                >
                                    <span>See all results for &ldquo;{query}&rdquo;</span>
                                    <ArrowRightIcon className="size-4 shrink-0" strokeWidth={2} />
                                </Button>
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
