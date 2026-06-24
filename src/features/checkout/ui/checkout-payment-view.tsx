"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { paymentSchema } from "@/features/checkout/model/payment.schema";
import type { PaymentFormValues } from "@/features/checkout/model/payment.schema";
import { submitMockPayment } from "@/features/checkout/server/checkout.actions";
import { CheckoutCardVisual } from "@/features/checkout/ui/checkout-card-visual";
import { CheckoutField } from "@/features/checkout/ui/checkout-field";
import { useCartStore } from "@/features/cart/store/cart.store";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { showToast } from "@/shared/lib/toast";

type CheckoutPaymentViewProps = {
    email: string;
};

function formatCardNumberInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiryInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
}

export function CheckoutPaymentView({ email }: CheckoutPaymentViewProps) {
    const router = useRouter();
    const clearCart = useCartStore((s) => s.clearCart);
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            cardNumber: "",
            cardholderName: "",
            expiry: "",
            cvv: "",
        },
    });

    const watchedCardNumber = useWatch({ control, name: "cardNumber" });
    const watchedCardholderName = useWatch({ control, name: "cardholderName" });
    const watchedExpiry = useWatch({ control, name: "expiry" });

    async function onSubmit(data: PaymentFormValues) {
        const result = await submitMockPayment(data, email);
        if (!result.success) {
            showToast.error(result.error);
            return;
        }
        clearCart();
        router.push(`/checkout/confirmation?orderRef=${encodeURIComponent(result.orderRef)}`);
    }

    return (
        <div className="flex flex-col items-center gap-8 max-w-md mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                <CheckoutCardVisual
                    cardNumber={watchedCardNumber}
                    cardholderName={watchedCardholderName}
                    expiry={watchedExpiry}
                    isFlipped={isCardFlipped}
                />
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate={true} className="w-full">
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 }}
                    >
                        <CheckoutField label="Card Number" htmlFor="cardNumber" error={errors.cardNumber?.message}>
                            <Input
                                id="cardNumber"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-number"
                                placeholder="1234 5678 9012 3456"
                                aria-invalid={!!errors.cardNumber}
                                aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                                className="font-mono"
                                {...register("cardNumber")}
                                onChange={(e) => {
                                    const formatted = formatCardNumberInput(e.target.value);
                                    setValue("cardNumber", formatted, { shouldValidate: false });
                                }}
                            />
                        </CheckoutField>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                    >
                        <CheckoutField
                            label="Cardholder Name"
                            htmlFor="cardholderName"
                            error={errors.cardholderName?.message}
                        >
                            <Input
                                id="cardholderName"
                                type="text"
                                autoComplete="cc-name"
                                placeholder="Jane Smith"
                                aria-invalid={!!errors.cardholderName}
                                aria-describedby={errors.cardholderName ? "cardholderName-error" : undefined}
                                className="uppercase placeholder:normal-case"
                                {...register("cardholderName")}
                            />
                        </CheckoutField>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.15 }}
                        className="flex gap-4"
                    >
                        <CheckoutField
                            label="Expiry Date"
                            htmlFor="expiry"
                            error={errors.expiry?.message}
                            className="flex-1"
                        >
                            <Input
                                id="expiry"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-exp"
                                placeholder="MM/YY"
                                maxLength={5}
                                aria-invalid={!!errors.expiry}
                                aria-describedby={errors.expiry ? "expiry-error" : undefined}
                                className="font-mono"
                                {...register("expiry")}
                                onChange={(e) => {
                                    const formatted = formatExpiryInput(e.target.value);
                                    setValue("expiry", formatted, { shouldValidate: false });
                                }}
                            />
                        </CheckoutField>

                        <CheckoutField label="CVV" htmlFor="cvv" error={errors.cvv?.message} className="flex-1">
                            <Input
                                id="cvv"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                                placeholder="•••"
                                maxLength={4}
                                aria-invalid={!!errors.cvv}
                                aria-describedby={errors.cvv ? "cvv-error" : undefined}
                                className="font-mono"
                                {...register("cvv", {
                                    onBlur: () => setIsCardFlipped(false),
                                })}
                                onFocus={() => setIsCardFlipped(true)}
                            />
                        </CheckoutField>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.2 }}
                        className="flex flex-col gap-3 pt-2"
                    >
                        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="size-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Processing…
                                </>
                            ) : (
                                <>
                                    <ArrowRightIcon className="size-4.5" strokeWidth={1.9} />
                                    Pay Now
                                </>
                            )}
                        </Button>
                        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                            <LockIcon className="size-3" strokeWidth={2} />
                            Secured mock payment — no real charges
                        </p>
                    </motion.div>
                </div>
            </form>
        </div>
    );
}
