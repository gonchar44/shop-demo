import type { SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCartLines } from "@/features/cart/lib/use-cart-lines";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { CheckoutContactSection } from "@/features/checkout/ui/checkout-contact-section";
import { CheckoutShippingAddressSection } from "@/features/checkout/ui/checkout-shipping-address-section";
import { CheckoutShippingMethodSection } from "@/features/checkout/ui/checkout-shipping-method-section";
import { CheckoutSectionHeader } from "@/features/checkout/ui/checkout-section-header";
import { Button } from "@/shared/ui/button";

type CheckoutFormProps = {
    shippingOptions: ShippingOption[];
    onSubmit: SubmitHandler<CheckoutFormValues>;
};

export function CheckoutForm({ shippingOptions, onSubmit }: CheckoutFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useFormContext<CheckoutFormValues>();

    const { subtotalCents, isLoading: isCartLoading } = useCartLines();

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true} className="flex-1 min-w-0">
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
                        control={control}
                        subtotalCents={subtotalCents}
                        shippingOptions={shippingOptions}
                        isLoading={isCartLoading}
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
