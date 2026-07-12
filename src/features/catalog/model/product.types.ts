export type ProductListParams = {
    page: number;
    limit: number;
    q?: string;
    category?: string[];
    collection?: string[];
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
    collections: ProductAttribute[];
    rooms: ProductAttribute[];
    styles: ProductAttribute[];
    materials: ProductAttribute[];
    colors: ProductColor[];
    priceBounds: {
        minCents: number;
        maxCents: number;
    };
};

export type ProductVariantSummary = {
    id: string;
    name: string;
    sku: string | null;
    priceCents: number;
    stock: number;
    image: string | null;
    color: ProductColor | null;
    material: ProductAttribute | null;
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
    isFeatured: boolean;
    isNew: boolean;
    rating: number | null;
    reviewCount: number;
    dimensions: string | null;
    weight: string | null;
    materialDetail: string | null;
    bulbBase: string | null;
    origin: string | null;
    category: ProductAttribute;
    collection: ProductAttribute | null;
    room: ProductAttribute | null;
    style: ProductAttribute | null;
    variants: ProductVariantSummary[];
    inStock: boolean;
    fromPriceCents: number;
};

export type ProductDetail = ProductListItem & {
    images: string[];
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

export type RoomWithProductCount = {
    slug: string;
    name: string;
    productCount: number;
};

export type CollectionSummary = {
    slug: string;
    name: string;
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
