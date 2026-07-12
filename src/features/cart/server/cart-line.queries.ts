import { prisma } from "@/shared/db/prisma";
import type { CartLine } from "@/features/cart/model/cart-line.types";

const cartLineSelect = {
    id: true,
    name: true,
    sku: true,
    priceCents: true,
    stock: true,
    image: true,
    color: { select: { id: true, slug: true, name: true, hex: true } },
    material: { select: { id: true, slug: true, name: true } },
    product: {
        select: {
            id: true,
            slug: true,
            name: true,
            priceCents: true,
            compareAtCents: true,
            currency: true,
            thumbnail: true,
            category: { select: { id: true, slug: true, name: true } },
        },
    },
} as const;

function findVariantsByIds(ids: string[]) {
    return prisma.productVariant.findMany({
        where: { id: { in: ids }, product: { isPublished: true } },
        select: cartLineSelect,
    });
}

type VariantForCartLine = Awaited<ReturnType<typeof findVariantsByIds>>[number];

function mapVariantToCartLine(variant: VariantForCartLine): CartLine {
    return {
        variantId: variant.id,
        variantName: variant.name,
        sku: variant.sku,
        priceCents: variant.priceCents ?? variant.product.priceCents,
        stock: variant.stock,
        image: variant.image ?? variant.product.thumbnail,
        color: variant.color,
        material: variant.material,
        product: {
            id: variant.product.id,
            slug: variant.product.slug,
            name: variant.product.name,
            currency: variant.product.currency,
            compareAtCents: variant.product.compareAtCents,
            category: variant.product.category,
        },
    };
}

export async function getCartLinesByVariantIds(ids: string[]): Promise<{ lines: CartLine[]; missingIds: string[] }> {
    if (ids.length === 0) return { lines: [], missingIds: [] };
    const variants = await findVariantsByIds(ids);
    const foundIds = new Set(variants.map((v) => v.id));
    const missingIds = ids.filter((id) => !foundIds.has(id));
    return { lines: variants.map(mapVariantToCartLine), missingIds };
}
