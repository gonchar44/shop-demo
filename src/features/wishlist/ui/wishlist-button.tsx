"use client";

import { BookmarkIcon } from "lucide-react";

type WishlistButtonProps = {
    isInWishlist: boolean;
    onToggle: () => void;
};

export function WishlistButton({ isInWishlist, onToggle }: WishlistButtonProps) {
    return (
        <button
            type="button"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isInWishlist}
            onClick={onToggle}
            className="absolute cursor-pointer z-30 top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-1"
        >
            <BookmarkIcon
                className="w-4 h-4 text-gray-700"
                strokeWidth={2}
                fill={isInWishlist ? "currentColor" : "none"}
            />
        </button>
    );
}
