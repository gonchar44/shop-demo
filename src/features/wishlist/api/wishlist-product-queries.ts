import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/lib/api";
import type { ProductListItem } from "@/features/catalog/model/product.types";

type WishlistProductsResponse = { data: ProductListItem[] };

export const wishlistProductKeys = {
    all: ["wishlist-products"] as const,
    byIds: (ids: string[]) => [...wishlistProductKeys.all, ids] as const,
};

export function wishlistProductsQueryOptions(ids: string[]) {
    return queryOptions({
        queryKey: wishlistProductKeys.byIds(ids),
        queryFn: () => fetchWishlistProducts(ids),
        enabled: ids.length > 0,
    });
}

async function fetchWishlistProducts(ids: string[]): Promise<ProductListItem[]> {
    const response = await apiGet<WishlistProductsResponse>(`/api/products?ids=${ids.join(",")}`);
    if (!response) throw new Error("Failed to fetch wishlist products");
    return response.data ?? [];
}
