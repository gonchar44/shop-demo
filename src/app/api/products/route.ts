import { NextRequest } from "next/server";
import { z } from "zod";
import { productListSearchParamsSchema } from "@/features/catalog/model/product.schema";
import { getProductList } from "@/features/catalog/server/product.queries";

export async function GET(request: NextRequest) {
    const parsed = productListSearchParamsSchema.safeParse({
        page: request.nextUrl.searchParams.get("page") ?? undefined,
        limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
        return Response.json({ error: z.flattenError(parsed.error).fieldErrors }, { status: 400 });
    }

    return Response.json(await getProductList(parsed.data));
}
