"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { formatPrice } from "@/features/catalog/lib/price";
import type { ProductSuggestion } from "@/features/catalog/model/product.types";

type ProductSuggestionItemProps = {
    product: ProductSuggestion;
    isFocused: boolean;
    onSelect: (slug: string) => void;
};

export function ProductSuggestionItem({ product, isFocused, onSelect }: ProductSuggestionItemProps) {
    return (
        <Button
            variant="ghost"
            size="lg"
            className={cn("text-left px-2 py-2.5 h-auto w-full", isFocused && "bg-gray-100")}
            role="option"
            aria-selected={isFocused}
            onClick={() => onSelect(product.slug)}
        >
            <div className="size-14 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.thumbnail ? (
                    <Image
                        src="/products/lamp.png"
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-contain w-10 h-10"
                    />
                ) : (
                    <ImageIcon className="size-5 text-gray-300" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-widest leading-none mb-0.5">
                    {product.category.name}
                </p>
                <p className="text-sm font-semibold text-gray-950 truncate leading-snug">{product.name}</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-sm font-semibold text-gray-700">
                        {formatPrice(product.priceCents, product.currency)}
                    </span>
                    {product.compareAtCents !== null && product.compareAtCents > product.priceCents && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.compareAtCents, product.currency)}
                        </span>
                    )}
                </div>
            </div>
        </Button>
    );
}
