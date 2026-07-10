import { NextRequest } from "next/server";
import { z } from "zod";
import { CART_MAX_ITEMS } from "@/features/cart/lib/cart.constants";
import { getCartLinesByVariantIds } from "@/features/cart/server/cart-line.queries";

const variantIdsSchema = z
    .string()
    .transform((s) =>
        s
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean),
    )
    .pipe(z.array(z.string().min(1)).min(1).max(CART_MAX_ITEMS));

export async function GET(request: NextRequest) {
    const idsParam = request.nextUrl.searchParams.get("variantIds");

    if (idsParam === null) {
        return Response.json({ error: "Missing variantIds parameter" }, { status: 400 });
    }

    const parsed = variantIdsSchema.safeParse(idsParam);
    if (!parsed.success) {
        return Response.json({ error: "Invalid variantIds parameter" }, { status: 400 });
    }

    try {
        const data = await getCartLinesByVariantIds(parsed.data);
        return Response.json({ data });
    } catch (error) {
        console.error("Failed to fetch cart lines:", error);
        return Response.json({ error: "Failed to fetch cart lines" }, { status: 500 });
    }
}
