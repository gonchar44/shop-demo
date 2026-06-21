import { z } from "zod";

export const geoapifySuggestionSchema = z.object({
    place_id: z.string().optional(),
    formatted: z.string().optional(),
    address_line1: z.string().optional(),
    address_line2: z.string().optional(),
    housenumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
    country_code: z.string().optional(),
    result_type: z.string().optional(),
    county: z.string().optional(),
    suburb: z.string().optional(),
    lon: z.number().optional(),
    lat: z.number().optional(),
});

export const geoapifyAutocompleteResponseSchema = z.object({
    results: z.array(geoapifySuggestionSchema),
});

export type GeoapifySuggestion = z.infer<typeof geoapifySuggestionSchema>;
export type GeoapifyAutocompleteResponse = z.infer<typeof geoapifyAutocompleteResponseSchema>;
