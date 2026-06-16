import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { connection } from "next/server";
import { productListSearchParamsSchema } from "@/features/catalog/model/product.schema";
import { productListServerQueryOptions } from "@/features/catalog/server/product-query-options";
import { getQueryClient } from "@/shared/lib/query-client.server";
import { ProductList } from "@/features/catalog/ui/product-list";
import { ProductSearch } from "@/features/catalog/ui/product-search";
import { Skeleton } from "@/shared/ui/skeleton";

export const metadata: Metadata = {
    title: "Catalog",
    description: "Browse all available products in the Shop Demo catalog.",
};

const CATALOG_LIMIT = 10;

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
    await connection();

    const { page, q } = productListSearchParamsSchema.parse({
        page: (await searchParams).page,
        limit: CATALOG_LIMIT,
        q: (await searchParams).q,
    });

    const params = { page, limit: CATALOG_LIMIT, q };
    const queryClient = getQueryClient();

    try {
        await queryClient.prefetchQuery(productListServerQueryOptions(params));
    } catch {
        // best-effort; client fetch will handle failure
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className="flex-1 bg-white gap-y-6 flex flex-col py-6">
                <h1 className="text-2xl font-bold text-gray-950">Products</h1>
                <Suspense fallback={<Skeleton className="w-96 h-12 rounded-2xl" />}>
                    <ProductSearch />
                </Suspense>
                <ProductList params={params} />
            </main>
        </HydrationBoundary>
    );
}
