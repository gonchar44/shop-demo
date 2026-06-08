import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/lib/api";
import type { ProductListItem } from "@/features/catalog/model/product.types";

type CartProductsResponse = { data: ProductListItem[] };

export const cartProductKeys = {
    all: ["cart-products"] as const,
    byIds: (ids: string[]) => [...cartProductKeys.all, ids] as const,
};

export function cartProductsQueryOptions(ids: string[]) {
    return queryOptions({
        queryKey: cartProductKeys.byIds(ids),
        queryFn: () => fetchCartProducts(ids),
        enabled: ids.length > 0,
    });
}

async function fetchCartProducts(ids: string[]): Promise<ProductListItem[]> {
    const response = await apiGet<CartProductsResponse>(`/api/products?ids=${ids.join(",")}`);
    if (!response) throw new Error("Failed to fetch cart products");
    return response.data ?? [];
}
