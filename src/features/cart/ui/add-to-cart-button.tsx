"use client";

import { HandbagIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useAddToCart } from "@/features/cart/lib/use-add-to-cart";

type AddToCartButtonProps = {
    productId: string;
    stock: number;
    className?: string;
};

export function AddToCartButton({ productId, stock, className }: AddToCartButtonProps) {
    const { quantity, isInCart, isOutOfStock, isAtStockLimit, handleAdd, handleIncrement } = useAddToCart(
        productId,
        stock,
    );

    function handleClick() {
        if (isInCart) {
            handleIncrement();
        } else {
            handleAdd();
        }
    }

    return (
        <Button
            type="button"
            variant="primary"
            size="md"
            className={className}
            onClick={handleClick}
            disabled={isOutOfStock || (isInCart && isAtStockLimit)}
        >
            <HandbagIcon className="size-4" strokeWidth={1.8} />
            {isOutOfStock ? "Out of stock" : `Add to cart${isInCart ? ` · ${quantity} in cart` : ""}`}
        </Button>
    );
}
