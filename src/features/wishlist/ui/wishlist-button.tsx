"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";

type WishlistButtonProps = {
    isInWishlist: boolean;
    onToggle: () => void;
};

export function WishlistButton({ isInWishlist, onToggle }: WishlistButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost-circle"
            size="icon-sm"
            shape="circle"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isInWishlist}
            onClick={onToggle}
            className="absolute z-30 top-3 right-3"
        >
            <BookmarkIcon
                className="w-4 h-4"
                strokeWidth={2}
                fill={isInWishlist ? "currentColor" : "none"}
            />
        </Button>
    );
}
