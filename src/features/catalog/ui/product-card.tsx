"use client";

import Link from "next/link";
import { HandbagIcon } from "lucide-react";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { BADGE_STYLES, resolveBadge } from "@/features/catalog/lib/product-badge";
import { WishlistButton } from "@/features/wishlist/ui/wishlist-button";
import { useWishlistToggle } from "@/features/wishlist/lib/use-wishlist-toggle";
import { CartQuantityControl } from "@/features/cart/ui/cart-quantity-control";
import { Badge } from "@/shared/ui/badge";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type ProductCardProps = {
    product: ProductListItem;
    loading?: "eager" | "lazy";
};

const cardActionButtonClassName = cn(
    "pointer-events-auto absolute bottom-2 right-2 bg-white",
    "transition-colors duration-150 hover:bg-gray-100",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
);

export function ProductCard({ product, loading }: ProductCardProps) {
    const { name, thumbnail, compareAtCents, currency, category } = product;
    const badge = resolveBadge(product);
    const { isInWishlist, toggle: handleWishlistToggle } = useWishlistToggle(product.id);

    const hasVariedPricing = new Set(product.variants.map((v) => v.priceCents)).size > 1;
    const soleVariant = product.variants.length === 1 ? product.variants[0] : undefined;

    return (
        <article className="group aspect-3/4 relative w-full select-none" aria-label={name}>
            <Link href={`/product/${product.slug}`} className="absolute inset-0" aria-label={name} />

            {/* Image area */}
            <div
                className={cn(
                    "absolute inset-x-0 top-0 bottom-[120px] z-20 flex items-center justify-center p-4 pointer-events-none",
                    !thumbnail && "bottom-14",
                )}
            >
                <ImageWithFallback
                    loading={loading}
                    src={thumbnail}
                    alt={name}
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    className="rounded-2xl max-w-full max-h-full object-contain"
                    iconClassName="size-10"
                    label="No image"
                />
            </div>

            <div className="h-5/6 absolute bottom-0 left-0 w-full bg-gray-100 rounded-3xl pointer-events-none">
                <WishlistButton
                    isInWishlist={isInWishlist}
                    onToggle={handleWishlistToggle}
                    className="pointer-events-auto"
                />
            </div>

            {/* Info panel */}
            <div className="flex flex-col z-30 items-end gap-y-1.5 absolute bottom-0 left-0 w-full pointer-events-none">
                {badge && <Badge className={cn("z-10 mr-2", BADGE_STYLES[badge.variant])}>{badge.label}</Badge>}

                <div className="bg-gray-950 rounded-3xl p-4 w-full">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest leading-none">
                        {category.name}
                    </p>
                    <h3 className="text-white font-bold text-sm leading-snug mt-1 truncate">{name}</h3>
                    <div className="flex items-center justify-between mt-3 gap-2">
                        <div className="flex items-baseline gap-2 min-w-0">
                            <span className="text-white font-semibold text-sm shrink-0">
                                {hasVariedPricing && "From "}
                                {formatPrice(product.fromPriceCents, currency)}
                            </span>
                            {compareAtCents && (
                                <span className="text-gray-500 text-xs line-through">
                                    {formatPrice(compareAtCents, currency)}
                                </span>
                            )}
                        </div>
                    </div>

                    {!product.inStock ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-md"
                            shape="circle"
                            disabled={true}
                            aria-label="Out of stock"
                            title="Out of stock"
                            className={cardActionButtonClassName}
                        >
                            <HandbagIcon className="size-5" strokeWidth={1.7} />
                        </Button>
                    ) : soleVariant ? (
                        <CartQuantityControl
                            variantId={soleVariant.id}
                            productId={product.id}
                            stock={soleVariant.stock}
                            className="pointer-events-auto absolute bottom-2 right-2"
                        />
                    ) : (
                        // TODO(quick-add-dialog): Step 6b replaces this navigation with a
                        // quick-add dialog for picking color/material without leaving the page.
                        <Link
                            href={`/product/${product.slug}`}
                            aria-label="Choose options"
                            title="Choose options"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon-md", shape: "circle" }),
                                cardActionButtonClassName,
                            )}
                        >
                            <HandbagIcon className="size-5" strokeWidth={1.7} />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
