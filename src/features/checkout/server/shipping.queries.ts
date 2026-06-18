import { prisma } from "@/shared/db/prisma";
import type { ShippingOption, ShippingOptionId } from "@/features/checkout/model/checkout.types";

export async function getShippingOptions(): Promise<ShippingOption[]> {
    const rows = await prisma.shippingOption.findMany({
        orderBy: { sortOrder: "asc" },
        select: {
            methodId: true,
            label: true,
            description: true,
            priceCents: true,
            freeAboveSubtotalCents: true,
        },
    });

    return rows.map((row) => ({
        ...row,
        methodId: row.methodId as ShippingOptionId,
    }));
}
