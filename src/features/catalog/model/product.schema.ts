import { z } from "zod";

const slugListSchema = z
    .string()
    .optional()
    .transform((v) => {
        if (!v) return undefined;
        const values = Array.from(
            new Set(
                v
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            ),
        );
        return values.length > 0 ? values : undefined;
    });

const booleanFlagSchema = z
    .string()
    .optional()
    .transform((v) => (v === "1" ? true : undefined));

export const productListSearchParamsSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    q: z
        .string()
        .trim()
        .max(80)
        .optional()
        .transform((v) => v || undefined),
    category: slugListSchema,
    room: slugListSchema,
    style: slugListSchema,
    material: slugListSchema,
    color: slugListSchema,
    minPriceCents: z.coerce.number().int().min(0).optional(),
    maxPriceCents: z.coerce.number().int().min(0).optional(),
    inStock: booleanFlagSchema,
    isNew: booleanFlagSchema,
    onSale: booleanFlagSchema,
});

export const suggestionsSearchParamsSchema = z.object({
    q: z.string().trim().min(2).max(80),
});
