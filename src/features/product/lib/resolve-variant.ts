import type { ProductVariantSummary } from "@/features/catalog/model/product.types";

type VariantAxisFilter = {
    colorSlug?: string | null;
    materialSlug?: string | null;
};

function matchesAxisFilter(variant: ProductVariantSummary, filter: VariantAxisFilter): boolean {
    if (filter.colorSlug !== undefined && (variant.color?.slug ?? null) !== filter.colorSlug) return false;
    if (filter.materialSlug !== undefined && (variant.material?.slug ?? null) !== filter.materialSlug) return false;
    return true;
}

export function findVariant(
    variants: ProductVariantSummary[],
    colorSlug: string | null,
    materialSlug: string | null,
): ProductVariantSummary | undefined {
    return variants.find((variant) => matchesAxisFilter(variant, { colorSlug, materialSlug }));
}

export function hasVariantMatching(variants: ProductVariantSummary[], filter: VariantAxisFilter): boolean {
    return variants.some((variant) => matchesAxisFilter(variant, filter));
}
