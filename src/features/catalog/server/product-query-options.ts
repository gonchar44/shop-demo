import { queryOptions } from "@tanstack/react-query";
import { productKeys } from "@/features/catalog/api/product-queries";
import type { ProductListParams } from "@/features/catalog/model/product.types";
import { getProductList } from "@/features/catalog/server/product.queries";

export function productListServerQueryOptions(params: ProductListParams) {
    return queryOptions({
        queryKey: productKeys.list(params),
        queryFn: () => getProductList(params),
    });
}
