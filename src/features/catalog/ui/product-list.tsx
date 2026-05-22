"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { productListQueryOptions } from "@/features/catalog/api/product-queries";
import type { ProductListParams } from "@/features/catalog/model/product.types";
import { ProductCard } from "./product-card";
import { ProductPagination } from "./product-pagination";
import { ProductListEmpty } from "./product-list-empty";
import { AlertCircleIcon } from "lucide-react";

export function ProductList({ params }: { params: ProductListParams }) {
    const { data: products, isPending, isError, refetch } = useQuery(productListQueryOptions(params));
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isError) {
            toast.error("Failed to load products", { icon: <AlertCircleIcon className="size-4 text-destructive" /> });
        }
    }, [isError]);

    function handleClearSearch() {
        router.push(pathname);
    }

    if (isPending) return <div className="py-10 text-center text-sm text-gray-500">Loading...</div>;
    if (isError || !products) return <ProductListEmpty variant="error" onRetry={refetch} />;
    if (products.data.length === 0)
        return (
            <ProductListEmpty variant={params.q ? "no-results" : "empty-catalog"} onClearSearch={handleClearSearch} />
        );

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 py-5">
                {products.data.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
            <ProductPagination pagination={products.pagination} />
        </>
    );
}
