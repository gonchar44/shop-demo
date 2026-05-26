import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WISHLIST_MAX_ITEMS } from "@/features/wishlist/lib/wishlist.constants";

export type WishlistItem = {
    id: string;
    addedAt: number;
};

function toggleItem(items: WishlistItem[], id: string): WishlistItem[] {
    const isInWishlist = items.some((i) => i.id === id);
    if (isInWishlist) return items.filter((i) => i.id !== id);
    if (items.length >= WISHLIST_MAX_ITEMS) return items;
    return [...items, { id, addedAt: Date.now() }];
}

type WishlistStore = {
    items: WishlistItem[];
    toggleWishlistItem: (id: string) => void;
};

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set) => ({
            items: [],
            toggleWishlistItem: (id) => set((state) => ({ items: toggleItem(state.items, id) })),
        }),
        { name: "wishlist" },
    ),
);
