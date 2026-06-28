import { prisma } from "@/shared/db/prisma";
import type {
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

function buildProductWhere(q?: string) {
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
    return { isPublished: true, ...searchFilter };
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
    const { page, limit, q } = params;
    const skip = (page - 1) * limit;
    const where = buildProductWhere(q);

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

export async function getProductsByIds(ids: string[]): Promise<ProductListItem[]> {
    if (ids.length === 0) return [];
    const products = await prisma.product.findMany({
        where: { isPublished: true, id: { in: ids } },
        select: productListSelect,
    });
    return products.map(mapProductForList);
}

export async function getProductSuggestions(q: string): Promise<SuggestionsResponse> {
    const where = buildProductWhere(q);

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
