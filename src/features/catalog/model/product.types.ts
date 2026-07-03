export type ProductListParams = {
    page: number;
    limit: number;
    q?: string;
    category?: string[];
    room?: string[];
    style?: string[];
    material?: string[];
    color?: string[];
    minPriceCents?: number;
    maxPriceCents?: number;
    inStock?: boolean;
    isNew?: boolean;
    onSale?: boolean;
    featured?: boolean;
};

export type ProductAttribute = {
    id: string;
    slug: string;
    name: string;
};

export type ProductColor = ProductAttribute & {
    hex: string | null;
};

export type ProductFilterOptions = {
    categories: ProductAttribute[];
    rooms: ProductAttribute[];
    styles: ProductAttribute[];
    materials: ProductAttribute[];
    colors: ProductColor[];
    priceBounds: {
        minCents: number;
        maxCents: number;
    };
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

export type ProductSuggestion = {
    id: string;
    slug: string;
    name: string;
    thumbnail: string;
    priceCents: number;
    compareAtCents: number | null;
    currency: string;
    category: ProductAttribute;
};

export type SuggestionsResponse = {
    products: ProductSuggestion[];
    categories: ProductAttribute[];
};
