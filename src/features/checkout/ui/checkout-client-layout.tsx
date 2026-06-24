"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ShoppingBagIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/features/cart/store/cart.store";
import { checkoutSchema } from "@/features/checkout/model/checkout.schema";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { CheckoutForm } from "@/features/checkout/ui/checkout-form";
import { CheckoutOrderSummary } from "@/features/checkout/ui/checkout-order-summary";
import { buttonVariants } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";

type CheckoutClientLayoutProps = {
    shippingOptions: ShippingOption[];
};

export function CheckoutClientLayout({ shippingOptions }: CheckoutClientLayoutProps) {
    const items = useCartStore((s) => s.items);
    const router = useRouter();

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
            shippingMethod: shippingOptions[0]?.methodId ?? "standard",
        },
    });

    function onSubmit(data: CheckoutFormValues) {
        router.push(`/checkout/payment?email=${encodeURIComponent(data.email)}`);
    }

    if (items.length === 0) {
        return (
            <EmptyState
                icon={<ShoppingBagIcon />}
                heading="Nothing here yet"
                subtext="Add some items to your cart and come back to complete your purchase."
                action={
                    <Link href="/catalog" className={buttonVariants({ variant: "primary", size: "md" })}>
                        <ArrowLeftIcon className="size-4.5" strokeWidth={1.9} />
                        Continue Shopping
                    </Link>
                }
            />
        );
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
