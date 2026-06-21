import Image from "next/image";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { cn } from "@/shared/lib/utils";

type CheckoutOrderSummaryItemProps = {
    product: ProductListItem;
    quantity: number;
    showTopBorder: boolean;
};

export function CheckoutOrderSummaryItem({ product, quantity, showTopBorder }: CheckoutOrderSummaryItemProps) {
    const lineTotalCents = product.priceCents * quantity;
    const hasDiscount = product.compareAtCents !== null && product.compareAtCents > product.priceCents;
    const compareAtLineTotalCents = hasDiscount ? product.compareAtCents! * quantity : null;

    return (
        <li className={cn("flex items-center gap-3 py-3.5", showTopBorder && "border-t border-gray-200")}>
            <div className="relative flex-shrink-0 w-14 h-16 bg-gray-100 rounded-xl grid place-items-center">
                {product.thumbnail && (
                    <Image
                        src="/products/lamp.png"
                        alt={product.name}
                        width={40}
                        height={52}
                        className="object-contain"
                    />
                )}
                {quantity > 1 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-950 text-white text-xs font-bold grid place-items-center tabular-nums">
                        {quantity}
                    </span>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-mono text-xs tracking-widest text-gray-400 uppercase leading-none mb-0.5">
                    {product.category.name}
                </p>
                <p className="text-sm font-medium text-gray-950 truncate leading-snug">{product.name}</p>
                {quantity > 1 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                        {quantity} ×{" "}
                        {hasDiscount && (
                            <span className="line-through mr-1">
                                {formatPrice(product.compareAtCents!, product.currency)}
                            </span>
                        )}
                        {formatPrice(product.priceCents, product.currency)}
                    </p>
                )}
            </div>

            <div className="flex flex-col items-end flex-shrink-0 tabular-nums">
                {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through">
                        {formatPrice(compareAtLineTotalCents!, product.currency)}
                    </span>
                )}
                <span className="text-sm font-bold text-gray-950">
                    {formatPrice(lineTotalCents, product.currency)}
                </span>
            </div>
        </li>
    );
}
