import { NextRequest } from "next/server";
import { suggestionsSearchParamsSchema } from "@/features/catalog/model/product.schema";
import { getProductSuggestions } from "@/features/catalog/server/product.queries";

export async function GET(request: NextRequest) {
    const parsed = suggestionsSearchParamsSchema.safeParse({
        q: request.nextUrl.searchParams.get("q") ?? undefined,
    });

    if (!parsed.success) {
        return Response.json({ error: "Invalid query" }, { status: 400 });
    }

    try {
        const data = await getProductSuggestions(parsed.data.q);
        return Response.json(data);
    } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        return Response.json({ error: "Failed to fetch suggestions" }, { status: 500 });
    }
}
