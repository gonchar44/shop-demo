import Link from "next/link";
import { XIcon } from "lucide-react";
import type { CartLine } from "@/features/cart/model/cart-line.types";
import { formatVariantLabel } from "@/features/cart/lib/variant-label";
import { formatPrice } from "@/features/catalog/lib/price";
import { CartQuantityControl } from "@/features/cart/ui/cart-quantity-control";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";

type CartPopoverItemProps = {
    line: CartLine;
    showTopBorder: boolean;
    onRemove: () => void;
};

export function CartPopoverItem({ line, showTopBorder, onRemove }: CartPopoverItemProps) {
    const { product } = line;
    const variantLabel = formatVariantLabel(line);

    return (
        <li
            className={cn(
                "grid items-center gap-3.5 px-4 py-3.5",
                "grid-cols-[auto_1fr_auto]",
                showTopBorder && "border-t border-gray-100",
            )}
        >
            {/* Thumbnail */}
            <Link
                href={`/product/${product.slug}`}
                className="w-18 h-22 bg-gray-100 rounded-xl grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
            >
                <ImageWithFallback
                    src={line.image}
                    alt={product.name}
                    width={54}
                    height={66}
                    className="object-contain"
                    iconClassName="size-5"
                />
            </Link>

            {/* Meta */}
            <div className="min-w-0 flex flex-col gap-1">
                <Link
                    href={`/product/${product.slug}`}
                    className="min-w-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                >
                    <p className="font-mono text-xs tracking-widest text-gray-400 uppercase leading-none">
                        {product.category.name}
                    </p>
                    <p className="text-sm font-semibold text-gray-950 truncate leading-snug">{product.name}</p>
                    {variantLabel && <p className="text-xs text-gray-400 leading-none">{variantLabel}</p>}
                    <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-sm font-bold text-gray-950">
                            {formatPrice(line.priceCents, product.currency)}
                        </span>
                        {product.compareAtCents !== null && product.compareAtCents > line.priceCents && (
                            <span className="text-xs text-gray-400 line-through">
                                {formatPrice(product.compareAtCents, product.currency)}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Quantity stepper */}
                <CartQuantityControl
                    variantId={line.variantId}
                    productId={line.product.id}
                    stock={line.stock}
                    variant="popover"
                    className="mt-1.5"
                />
            </div>

            {/* Remove */}
            <Button
                onClick={onRemove}
                variant="outlined"
                size="icon-sm"
                shape="circle"
                aria-label="Remove from cart"
                title="Remove from cart"
            >
                <XIcon className="size-4" strokeWidth={1.7} />
            </Button>
        </li>
    );
}
