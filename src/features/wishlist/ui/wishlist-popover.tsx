"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangleIcon, ArrowRightIcon, BookmarkIcon, XIcon } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { wishlistProductsQueryOptions } from "@/features/wishlist/api/wishlist-product-queries";
import { formatPrice } from "@/features/catalog/lib/price";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { PopoverClose } from "@/shared/ui/popover";
import { Skeleton } from "@/shared/ui/skeleton";
import { showToast } from "@/shared/lib/toast";
import { cn } from "@/shared/lib/utils";

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
        placeholderData: keepPreviousData,
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
            className="w-100 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
        >
            {/* Header */}
            <div className="flex justify-between items-center px-5 pt-4.5 pb-3.5 border-b border-gray-200">
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
                <PopoverClose asChild>
                    <Button variant="outlined" size="icon-sm" shape="circle" aria-label="Close wishlist">
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>
            </div>

            {/* Error state */}
            {isError && (
                <EmptyState
                    icon={AlertTriangleIcon}
                    heading="Something went wrong"
                    subtext="Couldn't load your saved items. Please try again later."
                    size="sm"
                />
            )}

            {/* Empty state */}
            {displayedProducts.length === 0 && !isLoading && !isFetching && !isPlaceholderData && !isError && (
                <EmptyState
                    icon={BookmarkIcon}
                    heading="No saved items"
                    subtext="Bookmark products you love and find them here."
                    size="sm"
                />
            )}

            {/* List */}
            {(isLoading || isFetching || displayedProducts.length > 0) && (
                <ul className="max-h-90 overflow-y-auto py-1.5 px-1">
                    {isLoading || (isFetching && displayedProducts.length === 0)
                        ? Array.from({ length: Math.max(ids.length, 1) }).map((_, i) => (
                              <li key={i} className="flex gap-3.5 px-4 py-3.5">
                                  <Skeleton className="flex-none w-18 h-22 rounded-xl" />
                                  <div className="flex-1 flex flex-col gap-2 pt-1">
                                      <Skeleton className="h-3 w-16 rounded" />
                                      <Skeleton className="h-4 w-3/4 rounded" />
                                      <Skeleton className="h-4 w-12 rounded" />
                                  </div>
                              </li>
                          ))
                        : displayedProducts.map((product, index) => (
                              <li
                                  key={product.id}
                                  className={cn(
                                      "grid items-center gap-3.5 px-4 py-3.5",
                                      "grid-cols-[auto_1fr_auto]",
                                      index > 0 && "border-t border-gray-100",
                                  )}
                              >
                                  {/* Thumbnail */}
                                  <div className="w-18 h-22 bg-gray-100 rounded-xl grid place-items-center">
                                      {/* TODO: set a real image src */}
                                      {product.thumbnail && (
                                          <Image
                                              src="/products/lamp.png"
                                              alt={product.name}
                                              width={54}
                                              height={66}
                                              className="object-contain"
                                          />
                                      )}
                                  </div>

                                  {/* Meta */}
                                  <div className="min-w-0 flex flex-col gap-1">
                                      <p className="font-mono text-xs tracking-widest text-gray-400 uppercase leading-none">
                                          {product.category.name}
                                      </p>
                                      <p className="text-sm font-semibold text-gray-950 truncate leading-snug">
                                          {product.name}
                                      </p>
                                      <p className="text-sm font-bold text-gray-950 mt-1">
                                          {formatPrice(product.priceCents, product.currency)}
                                      </p>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center gap-1.5">
                                      <Button
                                          onClick={() => {
                                              toggleWishlistItem(product.id);
                                              showToast.custom("Removed from wishlist", {
                                                  icon: <BookmarkIcon className="size-4" fill="none" />,
                                              });
                                          }}
                                          variant="primary"
                                          size="icon-sm"
                                          shape="circle"
                                          aria-label="Remove from wishlist"
                                          title="Remove from wishlist"
                                      >
                                          <BookmarkIcon className="size-4" strokeWidth={1.7} fill="currentColor" />
                                      </Button>
                                      {/*TODO: implement link, now this button is still disabled*/}
                                      <Button
                                          disabled={true}
                                          variant="outlined"
                                          size="icon-sm"
                                          shape="circle"
                                          aria-label="View product"
                                          title="View product"
                                      >
                                          <ArrowRightIcon className="size-4" strokeWidth={1.9} />
                                      </Button>
                                  </div>
                              </li>
                          ))}
                </ul>
            )}
        </motion.div>
    );
}
