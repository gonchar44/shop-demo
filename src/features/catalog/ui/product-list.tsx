"use client";

import { useQuery } from "@tanstack/react-query";
import { productListQueryOptions } from "@/features/catalog/api/product-queries";
import type { ProductListParams } from "@/features/catalog/model/product.types";
import { ProductCard } from "./product-card";

export function ProductList({ params }: { params: ProductListParams }) {
    const { data, isPending, isError } = useQuery(productListQueryOptions(params));

    if (isPending) return <div className="py-10 text-center text-sm text-gray-500">Loading...</div>;
    if (isError || !data) return <div className="py-10 text-center text-sm text-red-500">Failed to load products.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 py-5">
            {data.data.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
}
