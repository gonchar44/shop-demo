"use client";

import { useWatch } from "react-hook-form";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cartProductsQueryOptions } from "@/features/cart/api/cart-product-queries";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { Skeleton } from "@/shared/ui/skeleton";
import { CheckoutOrderSummaryItem } from "@/features/checkout/ui/checkout-order-summary-item";
import { cn } from "@/shared/lib/utils";

type CheckoutOrderSummaryProps = {
    shippingOptions: ShippingOption[];
};

export function CheckoutOrderSummary({ shippingOptions }: CheckoutOrderSummaryProps) {
    const selectedMethodId = useWatch<CheckoutFormValues, "shippingMethod">({ name: "shippingMethod" });

    const items = useCartStore((s) => s.items);
    const ids = items.map((i) => i.id);

    const { data: products = [], isLoading } = useQuery({
        ...cartProductsQueryOptions(ids),
        placeholderData: ids.length > 0 ? keepPreviousData : undefined,
    });

    const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));
    const displayedProducts = products
        .filter((p) => ids.includes(p.id))
        .sort((a, b) => (itemMap[b.id]?.addedAt ?? 0) - (itemMap[a.id]?.addedAt ?? 0));

    const subtotalCents = displayedProducts.reduce((sum, p) => {
        const qty = itemMap[p.id]?.quantity ?? 1;
        return sum + p.priceCents * qty;
    }, 0);

    const selectedOption = shippingOptions.find((o) => o.methodId === selectedMethodId);
    const shippingCostCents =
        selectedOption === undefined
            ? 0
            : selectedOption.freeAboveSubtotalCents !== null && subtotalCents >= selectedOption.freeAboveSubtotalCents
              ? 0
              : selectedOption.priceCents;

    const totalCents = subtotalCents + shippingCostCents;
    const currency = displayedProducts[0]?.currency ?? "USD";
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <div className="lg:sticky lg:top-24 h-fit lg:w-96 shrink-0">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                    <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-1">Order Summary</p>
                    <p className="text-lg font-bold text-gray-950">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                </div>

                {/* Items */}
                <div className="px-6">
                    {isLoading ? (
                        <div className="flex flex-col pb-2">
                            {Array.from({ length: Math.max(ids.length, 2) }).map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center gap-3 py-3.5",
                                        index > 0 && "border-t border-gray-200",
                                    )}
                                >
                                    <Skeleton className="w-14 h-16 rounded-xl flex-shrink-0" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Skeleton className="h-2.5 w-14 rounded" />
                                        <Skeleton className="h-4 w-28 rounded" />
                                    </div>
                                    <Skeleton className="h-4 w-12 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul>
                            {displayedProducts.map((product, index) => (
                                <CheckoutOrderSummaryItem
                                    key={product.id}
                                    product={product}
                                    quantity={itemMap[product.id]?.quantity ?? 1}
                                    showTopBorder={index > 0}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {/* Pricing breakdown */}
                <div className="border-t border-gray-200 px-6 py-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Subtotal</span>
                        <span className="text-sm font-medium text-gray-950 tabular-nums">
                            {formatPrice(subtotalCents, currency)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Shipping</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`${shippingCostCents}-${selectedMethodId}`}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className={cn(
                                    "text-sm font-medium tabular-nums",
                                    shippingCostCents === 0 ? "text-green-700" : "text-gray-950",
                                )}
                            >
                                {shippingCostCents === 0 ? "Free" : formatPrice(shippingCostCents, currency)}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-950">Total</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={totalCents}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="text-lg font-bold text-gray-950 tabular-nums"
                            >
                                {formatPrice(totalCents, currency)}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
