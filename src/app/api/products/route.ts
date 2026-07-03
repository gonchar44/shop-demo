import { NextRequest } from "next/server";
import { z } from "zod";
import { WISHLIST_MAX_ITEMS } from "@/features/wishlist/lib/wishlist.constants";
import { productListSearchParamsSchema } from "@/features/catalog/model/product.schema";
import { getProductList, getProductsByIds } from "@/features/catalog/server/product.queries";

const productIdsSchema = z
    .string()
    .transform((s) =>
        s
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean),
    )
    .pipe(z.array(z.string().min(1)).min(1).max(WISHLIST_MAX_ITEMS));

export async function GET(request: NextRequest) {
    const idsParam = request.nextUrl.searchParams.get("ids");

    if (idsParam !== null) {
        const parsed = productIdsSchema.safeParse(idsParam);
        if (!parsed.success) {
            return Response.json({ error: "Invalid ids parameter" }, { status: 400 });
        }
        try {
            const data = await getProductsByIds(parsed.data);
            return Response.json({ data });
        } catch (error) {
            console.error("Failed to fetch products by ids:", error);
            return Response.json({ error: "Failed to fetch products" }, { status: 500 });
        }
    }

    const parsed = productListSearchParamsSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));

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
