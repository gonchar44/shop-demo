import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { productListSearchParamsSchema } from "@/features/catalog/model/product.schema";
import { productListServerQueryOptions } from "@/features/catalog/server/product-query-options";
import { getProductFilterOptions } from "@/features/catalog/server/product.queries";
import { DEFAULT_FILTER_OPTIONS } from "@/features/catalog/lib/filter-params";
import { getQueryClient } from "@/shared/lib/query-client.server";
import { ProductList } from "@/features/catalog/ui/product-list";
import { ProductSearch } from "@/features/catalog/ui/product-search";
import { ProductFilters } from "@/features/catalog/ui/product-filters";
import { Skeleton } from "@/shared/ui/skeleton";

export const metadata: Metadata = {
    title: "Catalog",
    description: "Browse all available products in the Shop Demo catalog.",
};

const CATALOG_LIMIT = 10;

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const resolvedSearchParams = await searchParams;

    const params = productListSearchParamsSchema.parse({ ...resolvedSearchParams, limit: CATALOG_LIMIT });
    const queryClient = getQueryClient();

    const [, filterOptions] = await Promise.all([
        queryClient.prefetchQuery(productListServerQueryOptions(params)).catch(() => {
            // best-effort; client fetch will handle failure
        }),
        getProductFilterOptions().catch(() => DEFAULT_FILTER_OPTIONS),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex-1 bg-white gap-y-6 flex flex-col py-6">
                <h1 className="text-2xl font-bold text-gray-950">Products</h1>
                <Suspense
                    fallback={
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-96 h-12 rounded-2xl" />
                            <Skeleton className="w-28 h-11 rounded-2xl" />
                        </div>
                    }
                >
                    <div className="flex items-center gap-3">
                        <ProductSearch />
                        <ProductFilters options={filterOptions} />
                    </div>
                </Suspense>
                <ProductList params={params} />
            </main>
        </HydrationBoundary>
    );
}
