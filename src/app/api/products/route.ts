import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/shared/db/prisma";

const querySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(12),
});

export async function GET(request: NextRequest) {
    const parsed = querySchema.safeParse({
        page: request.nextUrl.searchParams.get("page") ?? undefined,
        limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
        return Response.json({ error: z.flattenError(parsed.error).fieldErrors }, { status: 400 });
    }

    const { page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            include: {
                category: true,
                collection: true,
                room: true,
                style: true,
                colors: true,
                materials: true,
                variants: { include: { color: true, material: true } },
            },
            orderBy: { createdAt: "asc" },
            skip,
            take: limit,
        }),
        prisma.product.count(),
    ]);

    return Response.json({
        data: products,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        },
    });
}
