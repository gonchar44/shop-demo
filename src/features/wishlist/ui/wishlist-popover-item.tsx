import Link from "next/link";
import { ArrowRightIcon, BookmarkIcon } from "lucide-react";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { Button, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

type WishlistPopoverItemProps = {
    product: ProductListItem;
    showTopBorder: boolean;
    onToggle: () => void;
};

export function WishlistPopoverItem({ product, showTopBorder, onToggle }: WishlistPopoverItemProps) {
    return (
        <li
            className={cn(
                "grid items-center gap-3.5 px-4 py-3.5",
                "grid-cols-[auto_1fr_auto]",
                showTopBorder && "border-t border-gray-100",
            )}
        >
            {/* Thumbnail */}
            <div className="w-18 h-22 bg-gray-100 rounded-xl grid place-items-center">
                <ImageWithFallback
                    src={product.thumbnail}
                    alt={product.name}
                    width={54}
                    height={66}
                    className="object-contain"
                    iconClassName="size-5"
                />
            </div>

            {/* Meta */}
            <div className="min-w-0 flex flex-col gap-1">
                <p className="font-mono text-xs tracking-widest text-gray-400 uppercase leading-none">
                    {product.category.name}
                </p>
                <p className="text-sm font-semibold text-gray-950 truncate leading-snug">{product.name}</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-bold text-gray-950">
                        {formatPrice(product.priceCents, product.currency)}
                    </span>
                    {product.compareAtCents !== null && product.compareAtCents > product.priceCents && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.compareAtCents, product.currency)}
                        </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
                <Button
                    onClick={onToggle}
                    variant="primary"
                    size="icon-sm"
                    shape="circle"
                    aria-label="Remove from wishlist"
                    title="Remove from wishlist"
                >
                    <BookmarkIcon className="size-4" strokeWidth={1.7} fill="currentColor" />
                </Button>
                <Link
                    href={`/product/${product.slug}`}
                    className={cn(buttonVariants({ variant: "outlined", size: "icon-sm", shape: "circle" }))}
                    aria-label="View product"
                    title="View product"
                >
                    <ArrowRightIcon className="size-4" strokeWidth={1.9} />
                </Link>
            </div>
        </li>
    );
}
