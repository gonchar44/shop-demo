import type { z } from "zod";
import type { checkoutSchema } from "@/features/checkout/model/checkout.schema";

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export type ShippingOptionId = CheckoutFormValues["shippingMethod"];

export type ShippingOption = {
    methodId: ShippingOptionId;
    label: string;
    description: string;
    priceCents: number;
    freeAboveSubtotalCents: number | null;
};
