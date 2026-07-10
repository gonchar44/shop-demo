"use client";

import { HandbagIcon } from "lucide-react";
import { showToast } from "@/shared/lib/toast";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CART_MAX_ITEMS } from "@/features/cart/lib/cart.constants";

export function useAddToCart(variantId: string, productId: string, stock: number) {
    const quantity = useCartStore((s) => s.items.find((i) => i.variantId === variantId)?.quantity ?? 0);
    const cartCount = useCartStore((s) => s.items.length);
    const addToCart = useCartStore((s) => s.addToCart);
    const updateQuantity = useCartStore((s) => s.updateQuantity);

    const isOutOfStock = stock === 0;
    const isInCart = quantity > 0;
    const isAtStockLimit = quantity >= stock;

    function handleAdd() {
        if (isOutOfStock) return;
        if (cartCount >= CART_MAX_ITEMS) {
            showToast.custom("Cart is full — remove an item to add more", {
                icon: <HandbagIcon className="size-4" />,
            });
            return;
        }
        addToCart(variantId, productId, stock);
        showToast.custom("Added to cart", { icon: <HandbagIcon className="size-4" /> });
    }

    function handleIncrement() {
        if (isAtStockLimit) return;
        updateQuantity(variantId, quantity + 1, stock);
    }

    return { quantity, isInCart, isOutOfStock, isAtStockLimit, handleAdd, handleIncrement };
}
