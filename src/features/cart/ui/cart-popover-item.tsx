import Image from "next/image";
import { XIcon } from "lucide-react";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { CartQuantityControl } from "@/features/cart/ui/cart-quantity-control";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type CartPopoverItemProps = {
    product: ProductListItem;
    showTopBorder: boolean;
    onRemove: () => void;
};

export function CartPopoverItem({ product, showTopBorder, onRemove }: CartPopoverItemProps) {
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
                {/* TODO: set a real image src */}
                {product.thumbnail && (
                    <Image
                        src="/products/lamp.png"
                        alt={product.name}
                        width={54}
                        height={66}
                        className="object-contain"
                    />
                )}
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
                    {product.compareAtCents && product.compareAtCents > product.priceCents && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.compareAtCents, product.currency)}
                        </span>
                    )}
                </div>

                {/* Quantity stepper */}
                <CartQuantityControl
                    productId={product.id}
                    stock={product.stock}
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
