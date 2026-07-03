import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/lib/api";
import { appendFilterParams } from "@/features/catalog/lib/filter-params";
import type {
    ProductListParams,
    ProductListResponse,
    SuggestionsResponse,
} from "@/features/catalog/model/product.types";

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
    appendFilterParams(searchParams, params);

    return apiGet<ProductListResponse>(`/api/products?${searchParams.toString()}`);
}

export const suggestionsKeys = {
    all: ["suggestions"] as const,
    byQuery: (q: string) => [...suggestionsKeys.all, q] as const,
};

export function suggestionsQueryOptions(q: string) {
    const normalized = q.trim();
    return queryOptions({
        queryKey: suggestionsKeys.byQuery(normalized),
        queryFn: () => apiGet<SuggestionsResponse>(`/api/products/suggestions?q=${encodeURIComponent(normalized)}`),
        enabled: normalized.length >= 2,
        staleTime: 30_000,
    });
}
