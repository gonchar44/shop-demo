import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/lib/api";
import type { ProductListParams, ProductListResponse } from "@/features/catalog/model/product.types";

export const productKeys = {
    all: ["products"] as const,
    lists: () => [...productKeys.all, "list"] as const,
    list: (params: ProductListParams) => [...productKeys.lists(), params] as const,
};

export function productListQueryOptions(params: ProductListParams) {
    return queryOptions({
        queryKey: productKeys.list(params),
        queryFn: () => getProducts(params),
    });
}

function getProducts(params: ProductListParams) {
    const searchParams = new URLSearchParams({
        page: String(params.page),
        limit: String(params.limit),
    });

    if (params.q) {
        searchParams.set("q", params.q);
    }

    return apiGet<ProductListResponse>(`/api/products?${searchParams.toString()}`);
}
