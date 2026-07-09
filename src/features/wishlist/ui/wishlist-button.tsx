"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type WishlistButtonProps = {
    isInWishlist: boolean;
    onToggle: () => void;
    variant?: "ghost-circle" | "outlined";
    className?: string;
};

export function WishlistButton({ isInWishlist, onToggle, variant = "ghost-circle", className }: WishlistButtonProps) {
    return (
        <Button
            type="button"
            variant={variant}
            size="icon-sm"
            shape="circle"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isInWishlist}
            onClick={onToggle}
            className={cn(variant === "ghost-circle" && "absolute z-30 top-3 right-3", className)}
        >
            <BookmarkIcon className="size-4" strokeWidth={2} fill={isInWishlist ? "currentColor" : "none"} />
        </Button>
    );
}
