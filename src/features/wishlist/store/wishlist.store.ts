import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
    ids: string[];
    toggleWishlistItem: (id: string) => void;
};

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set) => ({
            ids: [],
            toggleWishlistItem: (id) =>
                set((state) => ({
                    ids: state.ids.includes(id) ? state.ids.filter((i) => i !== id) : [...state.ids, id],
                })),
        }),
        { name: "wishlist" },
    ),
);
