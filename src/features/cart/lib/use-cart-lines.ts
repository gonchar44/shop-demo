"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cartLinesQueryOptions } from "@/features/cart/api/cart-line-queries";
import type { CartLine } from "@/features/cart/model/cart-line.types";

export type DisplayedCartLine = {
    line: CartLine;
    quantity: number;
    addedAt: number;
};

export function useCartLines() {
    const items = useCartStore((s) => s.items);
    const variantIds = items.map((i) => i.variantId);

    const {
        data: lines = [],
        isLoading,
        isFetching,
        isPlaceholderData,
        isError,
    } = useQuery({
        ...cartLinesQueryOptions(variantIds),
        placeholderData: variantIds.length > 0 ? keepPreviousData : undefined,
    });

    const itemMap = Object.fromEntries(items.map((i) => [i.variantId, i]));

    const displayedLines: DisplayedCartLine[] = lines
        .filter((line) => itemMap[line.variantId] !== undefined)
        .map((line) => ({
            line,
            quantity: itemMap[line.variantId].quantity,
            addedAt: itemMap[line.variantId].addedAt,
        }))
        .sort((a, b) => b.addedAt - a.addedAt);

    const subtotalCents = displayedLines.reduce((sum, { line, quantity }) => sum + line.priceCents * quantity, 0);
    const currency = displayedLines[0]?.line.product.currency ?? "USD";

    return {
        variantIds,
        displayedLines,
        subtotalCents,
        currency,
        lineCount: items.length,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        isLoading,
        isFetching,
        isPlaceholderData,
        isError,
    };
}
