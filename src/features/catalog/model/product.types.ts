export type ProductListParams = {
    page: number;
    limit: number;
    q?: string;
};

export type ProductAttribute = {
    id: string;
    slug: string;
    name: string;
};

export type ProductColor = ProductAttribute & {
    hex: string | null;
};

export type ProductListItem = {
    id: string;
    slug: string;
    name: string;
    description: string;
    priceCents: number;
    compareAtCents: number | null;
    currency: string;
    thumbnail: string;
    stock: number;
    isFeatured: boolean;
    isNew: boolean;
    rating: number | null;
    reviewCount: number;
    category: ProductAttribute;
    collection: ProductAttribute | null;
    room: ProductAttribute | null;
    style: ProductAttribute | null;
    colors: ProductColor[];
    materials: ProductAttribute[];
};

export type ProductListResponse = {
    data: ProductListItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};
