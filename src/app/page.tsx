import { connection } from "next/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { productListServerQueryOptions } from "@/features/catalog/server/product-query-options";
import { getQueryClient } from "@/shared/lib/query-client.server";

const INITIAL_PRODUCT_LIST_PARAMS = { page: 1, limit: 12 };

export default async function Home() {
    await connection();

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(productListServerQueryOptions(INITIAL_PRODUCT_LIST_PARAMS));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main />
        </HydrationBoundary>
    );
}
