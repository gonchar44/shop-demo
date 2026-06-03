"use client";

import Image from "next/image";
import { BookmarkIcon, HandbagIcon, ImageIcon } from "lucide-react";
import { showToast } from "@/shared/lib/toast";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice, getDiscountPercent } from "@/features/catalog/lib/price";
import { WishlistButton } from "@/features/wishlist/ui/wishlist-button";
import { WISHLIST_MAX_ITEMS } from "@/features/wishlist/lib/wishlist.constants";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CART_MAX_ITEMS } from "@/features/cart/lib/cart.constants";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";

type ProductCardProps = {
    product: ProductListItem;
};

type ProductBadge = { label: string; variant: "sale" | "new" | "featured" };

function resolveBadge(product: ProductListItem): ProductBadge | null {
    if (product.compareAtCents) {
        const discountLabel = getDiscountPercent(product.priceCents, product.compareAtCents);
        if (discountLabel) return { label: discountLabel, variant: "sale" };
    }
    if (product.isNew) return { label: "New", variant: "new" };
    if (product.isFeatured) return { label: "Featured", variant: "featured" };
    return null;
}

const BADGE_STYLES: Record<ProductBadge["variant"], string> = {
    sale: "bg-gray-950 text-white",
    new: "bg-orange-400/80 backdrop-blur-sm text-white",
    featured: "bg-blue-400/80 backdrop-blur-sm text-white",
};

export function ProductCard({ product }: ProductCardProps) {
    const { name, thumbnail, priceCents, compareAtCents, currency, category } = product;
    const badge = resolveBadge(product);
    const isInWishlist = useWishlistStore((s) => s.items.some((i) => i.id === product.id));
    const wishlistCount = useWishlistStore((s) => s.items.length);
    const toggleWishlistItem = useWishlistStore((s) => s.toggleWishlistItem);

    const addToCart = useCartStore((s) => s.addToCart);
    const cartItemQty = useCartStore((s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0);
    const cartCount = useCartStore((s) => s.items.length);

    const isOutOfStock = product.stock === 0;
    const isAtStockLimit = cartItemQty >= product.stock;
    const isCartDisabled = isOutOfStock || isAtStockLimit;
    const cartButtonLabel = isOutOfStock ? "Out of stock" : isAtStockLimit ? "Maximum quantity reached" : "Add to cart";

    function handleWishlistToggle() {
        if (!isInWishlist && wishlistCount >= WISHLIST_MAX_ITEMS) {
            showToast.custom("Wishlist is full — remove an item to add more", {
                icon: <BookmarkIcon className="size-4" fill="none" />,
            });
            return;
        }
        toggleWishlistItem(product.id);
        showToast.custom(isInWishlist ? "Removed from wishlist" : "Added to wishlist", {
            icon: <BookmarkIcon className="size-4" fill={isInWishlist ? "none" : "currentColor"} />,
        });
    }

    function handleAddToCart() {
        if (isOutOfStock || isAtStockLimit) return;
        if (cartItemQty === 0 && cartCount >= CART_MAX_ITEMS) {
            showToast.custom("Cart is full — remove an item to add more", {
                icon: <HandbagIcon className="size-4" />,
            });
            return;
        }
        addToCart(product.id, product.stock);
        showToast.custom("Added to cart", {
            icon: <HandbagIcon className="size-4" />,
        });
    }

    return (
        <article className="aspect-[3/4] relative w-full select-none" aria-label={name}>
            {/* Image area */}
            <div className="absolute inset-x-0 top-0 bottom-[120px] z-20 flex items-center justify-center p-4">
                {/* TODO: set a real image src */}
                {thumbnail ? (
                    <Image
                        loading="eager"
                        src="/products/lamp.png"
                        alt={name}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
                        className="rounded-2xl max-w-full max-h-full object-contain"
                    />
                ) : (
                    <ImageIcon className="size-10 text-muted-foreground" />
                )}
            </div>

            <div className="h-5/6 absolute bottom-0 left-0 w-full bg-gray-100 rounded-3xl">
                <WishlistButton isInWishlist={isInWishlist} onToggle={handleWishlistToggle} />
            </div>

            {/* Info panel */}
            <div className="flex flex-col z-30 items-end gap-y-1.5 absolute bottom-0 left-0 w-full">
                {badge && <Badge className={cn("z-10 mr-2", BADGE_STYLES[badge.variant])}>{badge.label}</Badge>}

                <div className="bg-gray-950 rounded-3xl p-4 w-full">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest leading-none">
                        {category.name}
                    </p>
                    <h3 className="text-white font-bold text-sm leading-snug mt-1 truncate">{name}</h3>
                    <div className="flex items-center justify-between mt-3 gap-2">
                        <div className="flex items-baseline gap-2 min-w-0">
                            <span className="text-white font-semibold text-sm shrink-0">
                                {formatPrice(priceCents, currency)}
                            </span>
                            {compareAtCents && (
                                <span className="text-gray-500 text-xs line-through">
                                    {formatPrice(compareAtCents, currency)}
                                </span>
                            )}
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="primary"
                        size="icon-md"
                        shape="circle"
                        aria-label={cartButtonLabel}
                        disabled={isCartDisabled}
                        onClick={handleAddToCart}
                        className="absolute bottom-2 right-2 shrink-0 bg-white text-gray-950 hover:bg-gray-100 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                    >
                        <HandbagIcon className="size-5" />
                    </Button>
                </div>
            </div>
        </article>
    );
}
