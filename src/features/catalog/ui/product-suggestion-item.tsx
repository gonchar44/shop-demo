"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
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
            className="text-left px-2 py-2.5 h-auto w-full"
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
                <p className="text-sm font-semibold text-gray-700 mt-0.5">
                    {formatPrice(product.priceCents, product.currency)}
                </p>
            </div>
        </Button>
    );
}
