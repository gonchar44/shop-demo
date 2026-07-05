"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { showToast } from "@/shared/lib/toast";
import { productListQueryOptions } from "@/features/catalog/api/product-queries";
import { hasActiveCatalogFilters } from "@/features/catalog/lib/filter-params";
import type { ProductListParams } from "@/features/catalog/model/product.types";
import { ProductCard } from "./product-card";
import { ProductPagination } from "./product-pagination";
import { ProductListEmpty } from "./product-list-empty";

export function ProductList({ params }: { params: ProductListParams }) {
    const { data: products, isPending, isError, refetch } = useQuery(productListQueryOptions(params));
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isError) {
            showToast.error("Failed to load products");
        }
    }, [isError]);

    function handleClearSearch() {
        router.push(pathname);
    }

    const hasActiveFilters = hasActiveCatalogFilters(params);

    if (isPending) return <div className="py-10 text-center text-sm text-gray-500">Loading...</div>;
    if (isError || !products) return <ProductListEmpty variant="error" onRetry={refetch} />;
    if (products.data.length === 0)
        return (
            <ProductListEmpty
                variant={hasActiveFilters ? "no-results" : "empty-catalog"}
                onClearSearch={handleClearSearch}
            />
        );

    return (
        <>
            {hasActiveFilters && (
                <p className="text-sm text-gray-500">
                    {products.pagination.total.toLocaleString()}{" "}
                    {products.pagination.total === 1 ? "product" : "products"} found
                </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 py-5">
                {products.data.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
            <ProductPagination pagination={products.pagination} />
        </>
    );
}
