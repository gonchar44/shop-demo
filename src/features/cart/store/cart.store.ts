import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CART_MAX_ITEMS } from "@/features/cart/lib/cart.constants";

export type CartItem = {
    variantId: string;
    productId: string;
    quantity: number;
    addedAt: number;
};

type CartStore = {
    items: CartItem[];
    addToCart: (variantId: string, productId: string, stock: number) => void;
    removeFromCart: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number, stock: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set) => ({
                items: [],

                addToCart: (variantId, productId, stock) =>
                    set(
                        (state) => {
                            if (stock <= 0) return state;
                            const existing = state.items.find((i) => i.variantId === variantId);
                            if (existing) {
                                return {
                                    items: state.items.map((i) =>
                                        i.variantId === variantId
                                            ? { ...i, quantity: Math.min(i.quantity + 1, stock) }
                                            : i,
                                    ),
                                };
                            }
                            if (state.items.length >= CART_MAX_ITEMS) return state;
                            return {
                                items: [...state.items, { variantId, productId, quantity: 1, addedAt: Date.now() }],
                            };
                        },
                        false,
                        "cart/addToCart",
                    ),

                removeFromCart: (variantId) =>
                    set(
                        (state) => ({ items: state.items.filter((i) => i.variantId !== variantId) }),
                        false,
                        "cart/removeFromCart",
                    ),

                updateQuantity: (variantId, quantity, stock) =>
                    set(
                        (state) => {
                            if (stock <= 0) return state;
                            const clamped = Math.max(1, Math.min(quantity, stock));
                            return {
                                items: state.items.map((i) =>
                                    i.variantId === variantId ? { ...i, quantity: clamped } : i,
                                ),
                            };
                        },
                        false,
                        "cart/updateQuantity",
                    ),

                clearCart: () => set({ items: [] }, false, "cart/clearCart"),
            }),
            {
                name: "cart",
            },
        ),
        { name: "CartStore" },
    ),
);
