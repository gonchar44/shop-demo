"use client";

import { useState } from "react";
import { HandbagIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CountBadge } from "@/shared/ui/count-badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CartPopover } from "@/features/cart/ui/cart-popover";

export function CartControl() {
    const [isOpen, setIsOpen] = useState(false);
    const count = useCartStore((s) => s.items.length);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-md"
                    shape="circle"
                    aria-label="Cart"
                    className={cn("relative", isOpen && "bg-gray-100")}
                >
                    <HandbagIcon className="size-5" strokeWidth={1.6} />
                    <CountBadge count={count} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                forceMount
                align="end"
                sideOffset={10}
                className="p-0 border-0 shadow-none w-auto bg-transparent"
            >
                <AnimatePresence>{isOpen && <CartPopover />}</AnimatePresence>
            </PopoverContent>
        </Popover>
    );
}
