"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/features/checkout/model/checkout.schema";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { CheckoutForm } from "@/features/checkout/ui/checkout-form";
import { CheckoutOrderSummary } from "@/features/checkout/ui/checkout-order-summary";

type CheckoutClientLayoutProps = {
    shippingOptions: ShippingOption[];
};

export function CheckoutClientLayout({ shippingOptions }: CheckoutClientLayoutProps) {
    const methods = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            addressLine2: "",
            city: "",
            country: "",
            postalCode: "",
            shippingMethod: "standard",
        },
    });

    function onSubmit(data: CheckoutFormValues) {
        // TODO: wire up to Stripe payment
        console.log("Checkout submitted:", data);
    }

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col lg:flex-row gap-x-16 gap-y-8">
                <CheckoutForm shippingOptions={shippingOptions} onSubmit={onSubmit} />
                <CheckoutOrderSummary shippingOptions={shippingOptions} />
            </div>
        </FormProvider>
    );
}
