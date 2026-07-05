"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangleIcon, BookmarkIcon, XIcon } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { wishlistProductsQueryOptions } from "@/features/wishlist/api/wishlist-product-queries";
import { WishlistPopoverItem } from "@/features/wishlist/ui/wishlist-popover-item";
import { WishlistPopoverItemSkeleton } from "@/features/wishlist/ui/wishlist-popover-item-skeleton";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { PopoverClose } from "@/shared/ui/popover";
import { showToast } from "@/shared/lib/toast";

export function WishlistPopover() {
    const items = useWishlistStore((s) => s.items);
    const toggleWishlistItem = useWishlistStore((s) => s.toggleWishlistItem);

    const ids = items.map((i) => i.id);

    const {
        data: products = [],
        isLoading,
        isFetching,
        isPlaceholderData,
        isError,
    } = useQuery({
        ...wishlistProductsQueryOptions(ids),
        placeholderData: ids.length > 0 ? keepPreviousData : undefined,
    });

    const addedAtMap = Object.fromEntries(items.map((i) => [i.id, i.addedAt]));
    const displayedProducts = products
        .filter((p) => ids.includes(p.id))
        .sort((a, b) => (addedAtMap[b.id] ?? 0) - (addedAtMap[a.id] ?? 0));

    const count = items.length;

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
                    <p className="font-mono text-xs tracking-widest uppercase text-gray-400">Wishlist</p>
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
                                {count} saved item{count !== 1 ? "s" : ""}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <PopoverClose asChild={true}>
                    <Button variant="outlined" size="icon-sm" shape="circle" aria-label="Close wishlist">
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>
            </div>

            {/* Error state */}
            {isError && (
                <EmptyState
                    icon={<AlertTriangleIcon />}
                    heading="Something went wrong"
                    subtext="Couldn't load your saved items. Please try again later."
                    size="sm"
                />
            )}

            {/* Empty state */}
            {displayedProducts.length === 0 && !isLoading && !isFetching && !isPlaceholderData && !isError && (
                <EmptyState
                    icon={<BookmarkIcon />}
                    heading="No saved items"
                    subtext="Bookmark products you love and find them here."
                    size="sm"
                />
            )}

            {/* List */}
            {(isLoading || isFetching || displayedProducts.length > 0) && (
                <ul className="flex-1 min-h-0 overflow-y-auto py-1.5 px-1">
                    {isLoading || (isFetching && displayedProducts.length === 0)
                        ? Array.from({ length: Math.max(ids.length, 1) }).map((_, index) => (
                              <WishlistPopoverItemSkeleton key={index} />
                          ))
                        : displayedProducts.map((product, index) => (
                              <WishlistPopoverItem
                                  key={product.id}
                                  product={product}
                                  showTopBorder={index > 0}
                                  onToggle={() => {
                                      toggleWishlistItem(product.id);
                                      showToast.custom("Removed from wishlist", {
                                          icon: <BookmarkIcon className="size-4" fill="none" />,
                                      });
                                  }}
                              />
                          ))}
                </ul>
            )}
        </motion.div>
    );
}
