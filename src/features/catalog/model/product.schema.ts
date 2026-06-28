import { z } from "zod";

export const productListSearchParamsSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    q: z
        .string()
        .trim()
        .max(80)
        .optional()
        .transform((v) => v || undefined),
});

export const suggestionsSearchParamsSchema = z.object({
    q: z.string().trim().min(2).max(80),
});
