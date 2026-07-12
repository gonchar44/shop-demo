import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/lib/api";
import type { CartLine } from "@/features/cart/model/cart-line.types";

type CartLinesResponse = { data: CartLine[]; missingIds: string[] };
export type CartLinesResult = { lines: CartLine[]; missingIds: string[] };

export const cartLineKeys = {
    all: ["cart-lines"] as const,
    byVariantIds: (variantIds: string[]) => [...cartLineKeys.all, variantIds] as const,
};

export function cartLinesQueryOptions(variantIds: string[]) {
    return queryOptions({
        queryKey: cartLineKeys.byVariantIds(variantIds),
        queryFn: () => fetchCartLines(variantIds),
        enabled: variantIds.length > 0,
    });
}

async function fetchCartLines(variantIds: string[]): Promise<CartLinesResult> {
    const response = await apiGet<CartLinesResponse>(`/api/cart/lines?variantIds=${variantIds.join(",")}`);
    if (!response) throw new Error("Failed to fetch cart lines");
    return { lines: response.data ?? [], missingIds: response.missingIds ?? [] };
}
