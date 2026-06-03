import Image from "next/image";
import { motion } from "motion/react";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type CartPopoverItemProps = {
    product: ProductListItem;
    quantity: number;
    showTopBorder: boolean;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
};

export function CartPopoverItem({
    product,
    quantity,
    showTopBorder,
    onQuantityChange,
    onRemove,
}: CartPopoverItemProps) {
    const isDecreaseDisabled = quantity <= 1;
    const isIncreaseDisabled = quantity >= product.stock;

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
                <p className="text-sm font-bold text-gray-950 mt-1">
                    {formatPrice(product.priceCents, product.currency)}
                </p>

                {/* Quantity stepper */}
                <div className="flex items-center gap-1 mt-1.5">
                    <Button
                        onClick={() => onQuantityChange(quantity - 1)}
                        disabled={isDecreaseDisabled}
                        variant="outlined"
                        size="icon-sm"
                        shape="circle"
                        aria-label="Decrease quantity"
                    >
                        <MinusIcon className="size-3.5" strokeWidth={2} />
                    </Button>
                    <motion.span
                        key={quantity}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className="w-6 text-center text-sm font-semibold text-gray-950 tabular-nums"
                    >
                        {quantity}
                    </motion.span>
                    <Button
                        onClick={() => onQuantityChange(quantity + 1)}
                        disabled={isIncreaseDisabled}
                        variant="outlined"
                        size="icon-sm"
                        shape="circle"
                        aria-label="Increase quantity"
                    >
                        <PlusIcon className="size-3.5" strokeWidth={2} />
                    </Button>
                </div>
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
