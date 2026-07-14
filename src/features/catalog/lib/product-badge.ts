import type { ProductListItem } from "@/features/catalog/model/product.types";
import { getDiscountPercent } from "@/features/catalog/lib/price";

export type ProductBadge = { label: string; variant: "sale" | "new" | "featured" };

export function resolveBadge(product: ProductListItem): ProductBadge | null {
    if (product.compareAtCents) {
        const discountLabel = getDiscountPercent(product.fromPriceCents, product.compareAtCents);
        if (discountLabel) return { label: discountLabel, variant: "sale" };
    }
    if (product.isNew) return { label: "New", variant: "new" };
    if (product.isFeatured) return { label: "Featured", variant: "featured" };
    return null;
}

export const BADGE_STYLES: Record<ProductBadge["variant"], string> = {
    sale: "bg-gray-950 text-white",
    new: "bg-orange-400/80 backdrop-blur-sm text-white",
    featured: "bg-blue-400/80 backdrop-blur-sm text-white",
};
