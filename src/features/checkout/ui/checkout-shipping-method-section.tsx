import { motion, AnimatePresence } from "motion/react";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { cn } from "@/shared/lib/utils";

type CheckoutShippingMethodSectionProps = {
    register: UseFormRegister<CheckoutFormValues>;
    watch: UseFormWatch<CheckoutFormValues>;
    subtotalCents: number;
    shippingOptions: ShippingOption[];
};

export function CheckoutShippingMethodSection({
    register,
    watch,
    subtotalCents,
    shippingOptions,
}: CheckoutShippingMethodSectionProps) {
    const selectedMethod = watch("shippingMethod");
    const anyOptionFree = shippingOptions.some(
        (o) => o.freeAboveSubtotalCents !== null && subtotalCents >= o.freeAboveSubtotalCents,
    );

    return (
        <div className="flex flex-col gap-3">
            <AnimatePresence>
                {anyOptionFree && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 4 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-medium text-green-700 overflow-hidden"
                    >
                        Your order qualifies for free standard shipping!
                    </motion.p>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shippingOptions.map((option) => {
                    const isSelected = selectedMethod === option.methodId;
                    const isFree =
                        option.freeAboveSubtotalCents !== null && subtotalCents >= option.freeAboveSubtotalCents;

                    return (
                        <label key={option.methodId} className="cursor-pointer">
                            <input
                                type="radio"
                                value={option.methodId}
                                {...register("shippingMethod")}
                                className="sr-only"
                            />
                            <div
                                className={cn(
                                    "flex flex-col gap-1.5 p-4 rounded-2xl border transition-all duration-150",
                                    isSelected
                                        ? "border-gray-950 bg-gray-100"
                                        : "border-gray-200 bg-white hover:border-gray-300",
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-950">{option.label}</span>

                                    {/* Custom radio indicator */}
                                    <div
                                        className={cn(
                                            "w-4.5 h-4.5 rounded-full border-2 grid place-items-center flex-shrink-0 transition-all duration-150",
                                            isSelected ? "border-gray-950 bg-gray-950" : "border-gray-300 bg-white",
                                        )}
                                    >
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    transition={{ duration: 0.12 }}
                                                    className="w-1.5 h-1.5 rounded-full bg-white"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500">{option.description}</p>

                                <div className="flex items-center gap-1.5">
                                    <span
                                        className={cn("text-sm font-bold", isFree ? "text-green-700" : "text-gray-950")}
                                    >
                                        {isFree ? "Free" : formatPrice(option.priceCents, "USD")}
                                    </span>
                                    {isFree && (
                                        <span className="text-xs text-gray-400 line-through">
                                            {formatPrice(option.priceCents, "USD")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
