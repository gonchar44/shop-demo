import { NextRequest } from "next/server";
import { z } from "zod";
import { geoapifyAutocompleteResponseSchema } from "@/features/checkout/model/geoapify.types";

const querySchema = z.string().min(3).max(200);

const GEOAPIFY_BASE = "https://api.geoapify.com/v1/geocode/autocomplete";

export async function GET(request: NextRequest) {
    const text = request.nextUrl.searchParams.get("text");

    const parsed = querySchema.safeParse(text);
    if (!parsed.success) {
        return Response.json({ error: "Invalid query" }, { status: 400 });
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;
    if (!apiKey) {
        return Response.json({ error: "Geocoding not configured" }, { status: 503 });
    }

    const url = new URL(GEOAPIFY_BASE);
    url.searchParams.set("text", parsed.data);
    url.searchParams.set("apiKey", apiKey);
    url.searchParams.set("limit", "5");
    url.searchParams.set("format", "json");

    try {
        const res = await fetch(url.toString(), { signal: AbortSignal.timeout(5000), next: { revalidate: 60 } });
        if (!res.ok) {
            console.error(`Geoapify API error: ${res.status} ${res.statusText}`);
            return Response.json({ error: "Geocoding service error" }, { status: 502 });
        }
        const data = await res.json();
        const validated = geoapifyAutocompleteResponseSchema.safeParse(data);
        if (!validated.success) {
            console.error("Unexpected Geoapify response shape:", validated.error);
            return Response.json({ error: "Geocoding service error" }, { status: 502 });
        }
        return Response.json(validated.data);
    } catch (error) {
        console.error("Address autocomplete fetch failed:", error);
        return Response.json({ error: "Failed to fetch suggestions" }, { status: 500 });
    }
}
