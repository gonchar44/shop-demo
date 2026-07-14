import type { ProductAttribute, ProductColor } from "@/features/catalog/model/product.types";

export type CartLine = {
    variantId: string;
    variantName: string;
    sku: string | null;
    priceCents: number;
    stock: number;
    image: string | null;
    color: ProductColor | null;
    material: ProductAttribute | null;
    product: {
        id: string;
        slug: string;
        name: string;
        currency: string;
        compareAtCents: number | null;
        category: ProductAttribute;
    };
};
