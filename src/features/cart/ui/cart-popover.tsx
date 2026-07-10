"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangleIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useCartLines } from "@/features/cart/lib/use-cart-lines";
import { CartPopoverItem } from "@/features/cart/ui/cart-popover-item";
import { CartPopoverItemSkeleton } from "@/features/cart/ui/cart-popover-item-skeleton";
import { CartPopoverFooter } from "@/features/cart/ui/cart-popover-footer";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { PopoverClose } from "@/shared/ui/popover";
import { showToast } from "@/shared/lib/toast";

export function CartPopover() {
    const removeFromCart = useCartStore((s) => s.removeFromCart);

    const {
        variantIds,
        displayedLines,
        subtotalCents,
        currency,
        lineCount,
        isLoading,
        isFetching,
        isPlaceholderData,
        isError,
    } = useCartLines();

    return (
        <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top right" }}
            className="w-[min(25rem,var(--radix-popover-content-available-width))] max-h-(--radix-popover-content-available-height) bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
            {/* Header */}
            <div className="shrink-0 flex justify-between items-center px-5 pt-4.5 pb-3.5 border-b border-gray-200">
                <div>
                    <p className="font-mono text-xs tracking-widest uppercase text-gray-400">Cart</p>
                    <AnimatePresence initial={false}>
                        {lineCount > 0 && (
                            <motion.p
                                key="count"
                                className="text-lg font-bold text-gray-950 overflow-hidden"
                                initial={{ opacity: 0, height: 0, y: -4 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -4 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                {lineCount} item{lineCount !== 1 ? "s" : ""}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <PopoverClose asChild={true}>
                    <Button variant="outlined" size="icon-sm" shape="circle" aria-label="Close cart">
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>
            </div>

            {/* Error state */}
            {isError && (
                <EmptyState
                    icon={<AlertTriangleIcon />}
                    heading="Something went wrong"
                    subtext="Couldn't load your cart. Please try again later."
                    size="sm"
                />
            )}

            {/* Empty state */}
            {displayedLines.length === 0 && !isLoading && !isFetching && !isPlaceholderData && !isError && (
                <EmptyState
                    icon={<ShoppingCartIcon />}
                    heading="Your cart is empty"
                    subtext="Add products you'd like to buy and find them here."
                    size="sm"
                />
            )}

            {/* List */}
            {!isError && (isLoading || isFetching || displayedLines.length > 0) && (
                <ul className="flex-1 min-h-0 overflow-y-auto py-1.5 px-1">
                    {isLoading || (isFetching && displayedLines.length === 0)
                        ? Array.from({ length: Math.max(variantIds.length, 1) }).map((_, index) => (
                              <CartPopoverItemSkeleton key={index} />
                          ))
                        : displayedLines.map(({ line }, index) => (
                              <CartPopoverItem
                                  key={line.variantId}
                                  line={line}
                                  showTopBorder={index > 0}
                                  onRemove={() => {
                                      removeFromCart(line.variantId);
                                      showToast.custom("Removed from cart", {
                                          icon: <ShoppingCartIcon className="size-4" />,
                                      });
                                  }}
                              />
                          ))}
                </ul>
            )}

            {/* Footer */}
            {!isError && displayedLines.length > 0 && !isLoading && (
                <div className="shrink-0">
                    <CartPopoverFooter subtotalCents={subtotalCents} subtotalCurrency={currency} />
                </div>
            )}
        </motion.div>
    );
}
