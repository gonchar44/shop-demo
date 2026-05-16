import { prisma } from "@/shared/db/prisma";
import type { ProductListItem, ProductListParams, ProductListResponse } from "@/features/catalog/model/product.types";

type ProductForList = Awaited<ReturnType<typeof findProductsForList>>[number];

function buildProductWhere(q?: string) {
    const searchFilter = q
        ? {
              OR: [
                  { name: { contains: q, mode: "insensitive" as const } },
                  { category: { name: { contains: q, mode: "insensitive" as const } } },
                  { collection: { name: { contains: q, mode: "insensitive" as const } } },
                  { room: { name: { contains: q, mode: "insensitive" as const } } },
                  { style: { name: { contains: q, mode: "insensitive" as const } } },
                  { colors: { some: { name: { contains: q, mode: "insensitive" as const } } } },
                  { materials: { some: { name: { contains: q, mode: "insensitive" as const } } } },
              ],
          }
        : {};
    return { isPublished: true, ...searchFilter };
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

function findProductsForList(skip: number, take: number, where: ReturnType<typeof buildProductWhere>) {
    return prisma.product.findMany({
        where,
        select: {
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
        },
        orderBy: { createdAt: "asc" },
        skip,
        take,
    });
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
