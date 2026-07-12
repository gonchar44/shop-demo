"use client";

import { BookmarkIcon } from "lucide-react";
import { showToast } from "@/shared/lib/toast";
import { WISHLIST_MAX_ITEMS } from "@/features/wishlist/lib/wishlist.constants";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";

export function useWishlistToggle(productId: string) {
    const isInWishlist = useWishlistStore((s) => s.items.some((i) => i.id === productId));
    const wishlistCount = useWishlistStore((s) => s.items.length);
    const toggleWishlistItem = useWishlistStore((s) => s.toggleWishlistItem);

    function toggle() {
        if (!isInWishlist && wishlistCount >= WISHLIST_MAX_ITEMS) {
            showToast.custom("Wishlist is full — remove an item to add more", {
                icon: <BookmarkIcon className="size-4" fill="none" />,
            });
            return;
        }
        toggleWishlistItem(productId);
        showToast.custom(isInWishlist ? "Removed from wishlist" : "Added to wishlist", {
            icon: <BookmarkIcon className="size-4" fill={isInWishlist ? "none" : "currentColor"} />,
        });
    }

    return { isInWishlist, toggle };
}
