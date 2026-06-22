import { prisma } from "@/shared/db/prisma";
import { checkoutSchema } from "@/features/checkout/model/checkout.schema";
import type { ShippingOption } from "@/features/checkout/model/checkout.types";

const shippingMethodEnum = checkoutSchema.shape.shippingMethod;

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
        methodId: shippingMethodEnum.parse(row.methodId),
    }));
}
