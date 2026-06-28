"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangleIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cartProductsQueryOptions } from "@/features/cart/api/cart-product-queries";
import { CartPopoverItem } from "@/features/cart/ui/cart-popover-item";
import { CartPopoverItemSkeleton } from "@/features/cart/ui/cart-popover-item-skeleton";
import { CartPopoverFooter } from "@/features/cart/ui/cart-popover-footer";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { PopoverClose } from "@/shared/ui/popover";
import { showToast } from "@/shared/lib/toast";

export function CartPopover() {
    const items = useCartStore((s) => s.items);
    const removeFromCart = useCartStore((s) => s.removeFromCart);

    const ids = items.map((i) => i.id);

    const {
        data: products = [],
        isLoading,
        isFetching,
        isPlaceholderData,
        isError,
    } = useQuery({
        ...cartProductsQueryOptions(ids),
        placeholderData: ids.length > 0 ? keepPreviousData : undefined,
    });

    const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));
    const displayedProducts = products
        .filter((p) => ids.includes(p.id))
        .sort((a, b) => (itemMap[b.id]?.addedAt ?? 0) - (itemMap[a.id]?.addedAt ?? 0));

    const count = items.length;

    const subtotalCents = displayedProducts.reduce((sum, p) => {
        const qty = itemMap[p.id]?.quantity ?? 1;
        return sum + p.priceCents * qty;
    }, 0);

    const subtotalCurrency = displayedProducts[0]?.currency ?? "USD";

    return (
        <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top right" }}
            className="w-100 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
        >
            {/* Header */}
            <div className="flex justify-between items-center px-5 pt-4.5 pb-3.5 border-b border-gray-200">
                <div>
                    <p className="font-mono text-xs tracking-widest uppercase text-gray-400">Cart</p>
                    <AnimatePresence initial={false}>
                        {count > 0 && (
                            <motion.p
                                key="count"
                                className="text-lg font-bold text-gray-950 overflow-hidden"
                                initial={{ opacity: 0, height: 0, y: -4 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -4 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                {count} item{count !== 1 ? "s" : ""}
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
            {displayedProducts.length === 0 && !isLoading && !isFetching && !isPlaceholderData && !isError && (
                <EmptyState
                    icon={<ShoppingCartIcon />}
                    heading="Your cart is empty"
                    subtext="Add products you'd like to buy and find them here."
                    size="sm"
                />
            )}

            {/* List */}
            {!isError && (isLoading || isFetching || displayedProducts.length > 0) && (
                <ul className="max-h-90 overflow-y-auto py-1.5 px-1">
                    {isLoading || (isFetching && displayedProducts.length === 0)
                        ? Array.from({ length: Math.max(ids.length, 1) }).map((_, index) => (
                              <CartPopoverItemSkeleton key={index} />
                          ))
                        : displayedProducts.map((product, index) => (
                              <CartPopoverItem
                                  key={product.id}
                                  product={product}
                                  showTopBorder={index > 0}
                                  onRemove={() => {
                                      removeFromCart(product.id);
                                      showToast.custom("Removed from cart", {
                                          icon: <ShoppingCartIcon className="size-4" />,
                                      });
                                  }}
                              />
                          ))}
                </ul>
            )}

            {/* Footer */}
            {!isError && displayedProducts.length > 0 && !isLoading && (
                <CartPopoverFooter subtotalCents={subtotalCents} subtotalCurrency={subtotalCurrency} />
            )}
        </motion.div>
    );
}
