"use client";

import { WishlistButton } from "@/features/wishlist/ui/wishlist-button";
import { useWishlistToggle } from "@/features/wishlist/lib/use-wishlist-toggle";
import type { ProductAttribute } from "@/features/catalog/model/product.types";

type ProductHeaderProps = {
    productId: string;
    category: ProductAttribute;
    collection: ProductAttribute | null;
};

export function ProductHeader({ productId, category, collection }: ProductHeaderProps) {
    const { isInWishlist, toggle } = useWishlistToggle(productId);

    return (
        <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-widest uppercase text-gray-400">
                {category.name}
                {collection && ` · ${collection.name}`}
            </p>
            <WishlistButton isInWishlist={isInWishlist} onToggle={toggle} variant="outlined" />
        </div>
    );
}
