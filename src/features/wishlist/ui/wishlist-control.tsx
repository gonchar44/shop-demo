"use client";

import { useState } from "react";
import { BookmarkIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { WishlistPopover } from "@/features/wishlist/ui/wishlist-popover";

export function WishlistControl() {
    const [isOpen, setIsOpen] = useState(false);
    const count = useWishlistStore((s) => s.items.length);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-md"
                    shape="circle"
                    aria-label="Wishlist"
                    className={cn("relative", isOpen && "bg-gray-100")}
                >
                    <BookmarkIcon className="size-5" strokeWidth={1.6} />
                    {count > 0 && (
                        <motion.span
                            key={count}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1.5 bg-gray-950 text-white rounded-full text-xs font-mono font-bold grid place-items-center border-2 border-white pointer-events-none"
                        >
                            {count}
                        </motion.span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                forceMount
                align="end"
                sideOffset={10}
                className="p-0 border-0 shadow-none w-auto bg-transparent"
            >
                <AnimatePresence>{isOpen && <WishlistPopover />}</AnimatePresence>
            </PopoverContent>
        </Popover>
    );
}
