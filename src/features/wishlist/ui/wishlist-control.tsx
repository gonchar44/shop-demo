"use client";

import { useState } from "react";
import { BookmarkIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CountBadge } from "@/shared/ui/count-badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { WishlistPopover } from "@/features/wishlist/ui/wishlist-popover";

export function WishlistControl() {
    const [isOpen, setIsOpen] = useState(false);
    const count = useWishlistStore((s) => s.items.length);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild={true}>
                <Button
                    variant="ghost"
                    size="icon-md"
                    shape="circle"
                    aria-label="Wishlist"
                    className={cn("relative", isOpen && "bg-gray-100")}
                >
                    <BookmarkIcon className="size-5" strokeWidth={1.6} />
                    <CountBadge count={count} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                forceMount={true}
                align="end"
                sideOffset={10}
                className="p-0 border-0 shadow-none w-auto bg-transparent"
            >
                <AnimatePresence>{isOpen && <WishlistPopover />}</AnimatePresence>
            </PopoverContent>
        </Popover>
    );
}
