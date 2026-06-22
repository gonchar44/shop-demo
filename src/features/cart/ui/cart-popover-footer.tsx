"use client";

import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/features/catalog/lib/price";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { PopoverClose } from "@/shared/ui/popover";

type CartPopoverFooterProps = {
    subtotalCents: number;
    subtotalCurrency: string;
};

export function CartPopoverFooter({ subtotalCents, subtotalCurrency }: CartPopoverFooterProps) {
    const isOnCheckout = usePathname() === "/checkout";

    return (
        <div className="px-5 py-4 border-t border-gray-200 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase text-gray-400">Subtotal</span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`${subtotalCents}-${subtotalCurrency}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="text-base font-bold text-gray-950 tabular-nums"
                    >
                        {formatPrice(subtotalCents, subtotalCurrency)}
                    </motion.span>
                </AnimatePresence>
            </div>
            {!isOnCheckout && (
                <PopoverClose asChild={true}>
                    <Link
                        href="/checkout"
                        className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}
                        aria-label="Proceed to checkout"
                    >
                        <ArrowRightIcon className="size-4" strokeWidth={1.9} />
                        Checkout
                    </Link>
                </PopoverClose>
            )}
        </div>
    );
}
