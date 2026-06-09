import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CART_MAX_ITEMS } from "@/features/cart/lib/cart.constants";

export type CartItem = {
    id: string;
    quantity: number;
    addedAt: number;
};

type CartStore = {
    items: CartItem[];
    addToCart: (id: string, stock: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number, stock: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set) => ({
                items: [],

                addToCart: (id, stock) =>
                    set(
                        (state) => {
                            if (stock <= 0) return state;
                            const existing = state.items.find((i) => i.id === id);
                            if (existing) {
                                return {
                                    items: state.items.map((i) =>
                                        i.id === id ? { ...i, quantity: Math.min(i.quantity + 1, stock) } : i,
                                    ),
                                };
                            }
                            if (state.items.length >= CART_MAX_ITEMS) return state;
                            return { items: [...state.items, { id, quantity: 1, addedAt: Date.now() }] };
                        },
                        false,
                        "cart/addToCart",
                    ),

                removeFromCart: (id) =>
                    set((state) => ({ items: state.items.filter((i) => i.id !== id) }), false, "cart/removeFromCart"),

                updateQuantity: (id, quantity, stock) =>
                    set(
                        (state) => {
                            if (stock <= 0) return state;
                            const clamped = Math.max(1, Math.min(quantity, stock));
                            return { items: state.items.map((i) => (i.id === id ? { ...i, quantity: clamped } : i)) };
                        },
                        false,
                        "cart/updateQuantity",
                    ),

                clearCart: () => set({ items: [] }, false, "cart/clearCart"),
            }),
            { name: "cart" },
        ),
        { name: "CartStore" },
    ),
);
