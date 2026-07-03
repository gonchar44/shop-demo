import { prisma } from "@/shared/db/prisma";
import type {
    ProductFilterOptions,
    ProductListItem,
    ProductListParams,
    ProductListResponse,
    ProductSuggestion,
    SuggestionsResponse,
} from "@/features/catalog/model/product.types";

const productListSelect = {
    id: true,
    slug: true,
    name: true,
    description: true,
    priceCents: true,
    compareAtCents: true,
    currency: true,
    thumbnail: true,
    stock: true,
    isFeatured: true,
    isNew: true,
    rating: true,
    reviewCount: true,
    category: { select: { id: true, slug: true, name: true } },
    collection: { select: { id: true, slug: true, name: true } },
    room: { select: { id: true, slug: true, name: true } },
    style: { select: { id: true, slug: true, name: true } },
    colors: { select: { id: true, slug: true, name: true, hex: true } },
    materials: { select: { id: true, slug: true, name: true } },
} as const;

type ProductWhereParams = Pick<
    ProductListParams,
    | "q"
    | "category"
    | "room"
    | "style"
    | "material"
    | "color"
    | "minPriceCents"
    | "maxPriceCents"
    | "inStock"
    | "isNew"
    | "onSale"
    | "featured"
>;

function buildProductWhere(params: ProductWhereParams) {
    const { q, category, room, style, material, color, minPriceCents, maxPriceCents, inStock, isNew, featured } =
        params;

    const searchFilter = q
        ? {
              OR: [
                  { name: { contains: q, mode: "insensitive" as const } },
                  { category: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { collection: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { room: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { style: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { colors: { some: { name: { contains: q, mode: "insensitive" as const } } } },
                  { materials: { some: { name: { contains: q, mode: "insensitive" as const } } } },
              ],
          }
        : {};

    const priceFilter =
        minPriceCents !== undefined || maxPriceCents !== undefined
            ? {
                  priceCents: {
                      ...(minPriceCents !== undefined && { gte: minPriceCents }),
                      ...(maxPriceCents !== undefined && { lte: maxPriceCents }),
                  },
              }
            : {};

    return {
        isPublished: true,
        ...searchFilter,
        ...priceFilter,
        ...(category?.length && { category: { is: { slug: { in: category } } } }),
        ...(room?.length && { room: { is: { slug: { in: room } } } }),
        ...(style?.length && { style: { is: { slug: { in: style } } } }),
        ...(material?.length && { materials: { some: { slug: { in: material } } } }),
        ...(color?.length && { colors: { some: { slug: { in: color } } } }),
        ...(inStock && { stock: { gt: 0 } }),
        ...(isNew && { isNew: true }),
        ...(featured && { isFeatured: true }),
    };
}

function findProductsForList(skip: number, take: number, where: ReturnType<typeof buildProductWhere>) {
    return prisma.product.findMany({
        where,
        select: productListSelect,
        orderBy: { createdAt: "asc" },
        skip,
        take,
    });
}

type ProductForList = Awaited<ReturnType<typeof findProductsForList>>[number];

function isActuallyOnSale(product: ProductForList): boolean {
    return product.compareAtCents !== null && product.compareAtCents > product.priceCents;
}

function mapProductForList(product: ProductForList): ProductListItem {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        compareAtCents: product.compareAtCents,
        currency: product.currency,
        thumbnail: product.thumbnail,
        stock: product.stock,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        rating: product.rating,
        reviewCount: product.reviewCount,
        category: product.category,
        collection: product.collection,
        room: product.room,
        style: product.style,
        colors: product.colors,
        materials: product.materials,
    };
}

export async function getProductList(params: ProductListParams): Promise<ProductListResponse> {
    const { page, limit, onSale } = params;
    const skip = (page - 1) * limit;
    const where = buildProductWhere(params);

    if (!onSale) {
        const [products, total] = await Promise.all([
            findProductsForList(skip, limit, where),
            prisma.product.count({ where }),
        ]);

        return {
            data: products.map(mapProductForList),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        };
    }

    const allProducts = await prisma.product.findMany({
        where,
        select: productListSelect,
    });

    const filteredProducts = allProducts.filter(isActuallyOnSale);
    const total = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    return {
        data: paginatedProducts.map(mapProductForList),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        },
    };
}

export async function getProductsByIds(ids: string[]): Promise<ProductListItem[]> {
    if (ids.length === 0) return [];
    const products = await prisma.product.findMany({
        where: { isPublished: true, id: { in: ids } },
        select: productListSelect,
    });
    return products.map(mapProductForList);
}

export async function getFeaturedProducts(limit: number): Promise<ProductListItem[]> {
    const products = await prisma.product.findMany({
        where: { isPublished: true, isFeatured: true },
        select: productListSelect,
        orderBy: { createdAt: "asc" },
        take: limit,
    });
    return products.map(mapProductForList);
}

export async function getProductSuggestions(q: string): Promise<SuggestionsResponse> {
    const where = buildProductWhere({ q });

    const [products, categories] = await Promise.all([
        prisma.product.findMany({
            where,
            select: {
                id: true,
                slug: true,
                name: true,
                thumbnail: true,
                priceCents: true,
                compareAtCents: true,
                currency: true,
                category: { select: { id: true, slug: true, name: true } },
            },
            orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
            take: 5,
        }),
        prisma.category.findMany({
            where: { name: { contains: q, mode: "insensitive" } },
            select: { id: true, slug: true, name: true },
            orderBy: { name: "asc" },
            take: 3,
        }),
    ]);

    return {
        products: products as ProductSuggestion[],
        categories,
    };
}

export async function getProductFilterOptions(): Promise<ProductFilterOptions> {
    const attributeSelect = { id: true, slug: true, name: true } as const;
    const publishedProductFilter = { products: { some: { isPublished: true } } };

    const [categories, rooms, styles, materials, colors, priceAggregate] = await Promise.all([
        prisma.category.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.room.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.style.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.material.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.color.findMany({
            where: publishedProductFilter,
            select: { ...attributeSelect, hex: true },
            orderBy: { name: "asc" },
        }),
        prisma.product.aggregate({
            where: { isPublished: true },
            _min: { priceCents: true },
            _max: { priceCents: true },
        }),
    ]);

    return {
        categories,
        rooms,
        styles,
        materials,
        colors,
        priceBounds: {
            minCents: priceAggregate._min.priceCents ?? 0,
            maxCents: priceAggregate._max.priceCents ?? 0,
        },
    };
}
