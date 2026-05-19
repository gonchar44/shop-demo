import { NextRequest } from "next/server";
import { z } from "zod";
import { productListSearchParamsSchema } from "@/features/catalog/model/product.schema";
import { getProductList } from "@/features/catalog/server/product.queries";

export async function GET(request: NextRequest) {
    const parsed = productListSearchParamsSchema.safeParse({
        page: request.nextUrl.searchParams.get("page") ?? undefined,
        limit: request.nextUrl.searchParams.get("limit") ?? undefined,
        q: request.nextUrl.searchParams.get("q") ?? undefined,
    });

    if (!parsed.success) {
        return Response.json({ error: z.flattenError(parsed.error).fieldErrors }, { status: 400 });
    }

    try {
        return Response.json(await getProductList(parsed.data));
    } catch (error) {
        console.error("Failed to fetch product list:", error);
        return Response.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
