"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cartProductsQueryOptions } from "@/features/cart/api/cart-product-queries";
import { checkoutSchema } from "@/features/checkout/model/checkout.schema";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { CheckoutContactSection } from "@/features/checkout/ui/checkout-contact-section";
import { CheckoutShippingAddressSection } from "@/features/checkout/ui/checkout-shipping-address-section";
import { CheckoutShippingMethodSection } from "@/features/checkout/ui/checkout-shipping-method-section";
import { CheckoutSectionHeader } from "@/features/checkout/ui/checkout-section-header";
import { Button } from "@/shared/ui/button";

type CheckoutFormProps = {
    shippingOptions: ShippingOption[];
};

export function CheckoutForm({ shippingOptions }: CheckoutFormProps) {
    const items = useCartStore((s) => s.items);
    const ids = items.map((i) => i.id);

    const { data: products = [] } = useQuery({
        ...cartProductsQueryOptions(ids),
        placeholderData: ids.length > 0 ? keepPreviousData : undefined,
    });

    const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));
    const subtotalCents = products.reduce((sum, p) => {
        const qty = itemMap[p.id]?.quantity ?? 1;
        return sum + p.priceCents * qty;
    }, 0);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormValues>({
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <div className="flex flex-col divide-y divide-gray-200">
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="pb-8"
                >
                    <CheckoutSectionHeader number="01" title="Contact" />
                    <CheckoutContactSection register={register} errors={errors} />
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="py-8"
                >
                    <CheckoutSectionHeader number="02" title="Shipping Address" />
                    <CheckoutShippingAddressSection register={register} errors={errors} />
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="py-8"
                >
                    <CheckoutSectionHeader number="03" title="Shipping Method" />
                    <CheckoutShippingMethodSection
                        register={register}
                        watch={watch}
                        subtotalCents={subtotalCents}
                        shippingOptions={shippingOptions}
                    />
                </motion.section>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
                className="pt-2"
            >
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    <ArrowRightIcon className="size-4.5" strokeWidth={1.9} />
                    Continue to Payment
                </Button>
            </motion.div>
        </form>
    );
}
