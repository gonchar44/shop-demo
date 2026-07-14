import { prisma } from "@/shared/db/prisma";
import type {
    CollectionSummary,
    ProductDetail,
    ProductFilterOptions,
    ProductListItem,
    ProductListParams,
    ProductListResponse,
    ProductSuggestion,
    ProductVariantSummary,
    RoomWithProductCount,
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
    isFeatured: true,
    isNew: true,
    rating: true,
    reviewCount: true,
    dimensions: true,
    weight: true,
    materialDetail: true,
    bulbBase: true,
    origin: true,
    category: { select: { id: true, slug: true, name: true } },
    collection: { select: { id: true, slug: true, name: true } },
    room: { select: { id: true, slug: true, name: true } },
    style: { select: { id: true, slug: true, name: true } },
    variants: {
        select: {
            id: true,
            name: true,
            sku: true,
            priceCents: true,
            stock: true,
            image: true,
            color: { select: { id: true, slug: true, name: true, hex: true } },
            material: { select: { id: true, slug: true, name: true } },
        },
    },
} as const;

const productDetailSelect = {
    ...productListSelect,
    images: true,
} as const;

type ProductWhereParams = Pick<
    ProductListParams,
    | "q"
    | "category"
    | "collection"
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
    const {
        q,
        category,
        collection,
        room,
        style,
        material,
        color,
        minPriceCents,
        maxPriceCents,
        inStock,
        isNew,
        onSale,
        featured,
    } = params;

    const searchFilter = q
        ? {
              OR: [
                  { name: { contains: q, mode: "insensitive" as const } },
                  { category: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { collection: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { room: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { style: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                  { variants: { some: { color: { is: { name: { contains: q, mode: "insensitive" as const } } } } } },
                  {
                      variants: {
                          some: { material: { is: { name: { contains: q, mode: "insensitive" as const } } } },
                      },
                  },
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

    const variantFilter = {
        ...(material?.length && { material: { slug: { in: material } } }),
        ...(color?.length && { color: { slug: { in: color } } }),
        ...(inStock && { stock: { gt: 0 } }),
    };

    return {
        isPublished: true,
        ...searchFilter,
        ...priceFilter,
        ...(category?.length && { category: { is: { slug: { in: category } } } }),
        ...(collection?.length && { collection: { is: { slug: { in: collection } } } }),
        ...(room?.length && { room: { is: { slug: { in: room } } } }),
        ...(style?.length && { style: { is: { slug: { in: style } } } }),
        ...(Object.keys(variantFilter).length > 0 && { variants: { some: variantFilter } }),
        ...(isNew && { isNew: true }),
        ...(onSale && { compareAtCents: { not: null, gt: prisma.product.fields.priceCents } }),
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

function mapProductVariant(
    variant: ProductForList["variants"][number],
    fallbackPriceCents: number,
): ProductVariantSummary {
    return {
        id: variant.id,
        name: variant.name,
        sku: variant.sku,
        priceCents: variant.priceCents ?? fallbackPriceCents,
        stock: variant.stock,
        image: variant.image,
        color: variant.color,
        material: variant.material,
    };
}

function mapProductForList(product: ProductForList): ProductListItem {
    const variants = product.variants.map((variant) => mapProductVariant(variant, product.priceCents));
    const inStockVariants = variants.filter((variant) => variant.stock > 0);

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        compareAtCents: product.compareAtCents,
        currency: product.currency,
        thumbnail: product.thumbnail,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        rating: product.rating,
        reviewCount: product.reviewCount,
        dimensions: product.dimensions,
        weight: product.weight,
        materialDetail: product.materialDetail,
        bulbBase: product.bulbBase,
        origin: product.origin,
        category: product.category,
        collection: product.collection,
        room: product.room,
        style: product.style,
        variants,
        inStock: inStockVariants.length > 0,
        fromPriceCents:
            inStockVariants.length > 0
                ? Math.min(...inStockVariants.map((variant) => variant.priceCents))
                : product.priceCents,
    };
}

type ProductForDetail = Awaited<ReturnType<typeof prisma.product.findFirst<{ select: typeof productDetailSelect }>>>;

function mapProductForDetail(product: NonNullable<ProductForDetail>): ProductDetail {
    return {
        ...mapProductForList(product),
        images: product.images,
    };
}

export async function getProductList(params: ProductListParams): Promise<ProductListResponse> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;
    const where = buildProductWhere(params);

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

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
    const product = await prisma.product.findFirst({
        where: { slug, isPublished: true },
        select: productDetailSelect,
    });
    return product ? mapProductForDetail(product) : null;
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

export async function getNewProducts(limit: number): Promise<ProductListItem[]> {
    const products = await prisma.product.findMany({
        where: { isPublished: true, isNew: true },
        select: productListSelect,
        orderBy: { createdAt: "desc" },
        take: limit,
    });
    return products.map(mapProductForList);
}

export async function getHeroProduct(): Promise<ProductListItem | null> {
    const featured = await prisma.product.findMany({
        where: { isPublished: true, isFeatured: true },
        select: productListSelect,
        orderBy: { createdAt: "asc" },
        take: 1,
    });
    if (featured.length > 0) return mapProductForList(featured[0]);

    const fallback = await prisma.product.findMany({
        where: { isPublished: true },
        select: productListSelect,
        orderBy: { createdAt: "desc" },
        take: 1,
    });
    return fallback.length > 0 ? mapProductForList(fallback[0]) : null;
}

export async function getRoomsWithProductCount(slugs: string[]): Promise<RoomWithProductCount[]> {
    const rooms = await prisma.room.findMany({
        where: { slug: { in: slugs } },
        select: { slug: true, name: true, _count: { select: { products: { where: { isPublished: true } } } } },
    });
    return rooms.map((room) => ({ slug: room.slug, name: room.name, productCount: room._count.products }));
}

export async function getCollectionsBySlugs(slugs: string[]): Promise<CollectionSummary[]> {
    return prisma.collection.findMany({
        where: { slug: { in: slugs }, products: { some: { isPublished: true } } },
        select: { slug: true, name: true },
    });
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
    const publishedVariantFilter = { variants: { some: { product: { isPublished: true } } } };

    const [categories, collections, rooms, styles, materials, colors, priceAggregate] = await Promise.all([
        prisma.category.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.collection.findMany({
            where: publishedProductFilter,
            select: attributeSelect,
            orderBy: { name: "asc" },
        }),
        prisma.room.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.style.findMany({ where: publishedProductFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.material.findMany({ where: publishedVariantFilter, select: attributeSelect, orderBy: { name: "asc" } }),
        prisma.color.findMany({
            where: publishedVariantFilter,
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
        collections,
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
