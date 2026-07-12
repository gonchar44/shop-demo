import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import type { CheckoutFormValues, ShippingOption } from "@/features/checkout/model/checkout.types";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { formatPrice } from "@/features/catalog/lib/price";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

type CheckoutShippingMethodSectionProps = {
    control: Control<CheckoutFormValues>;
    subtotalCents: number;
    shippingOptions: ShippingOption[];
    isLoading: boolean;
};

export function CheckoutShippingMethodSection({
    control,
    subtotalCents,
    shippingOptions,
    isLoading,
}: CheckoutShippingMethodSectionProps) {
    const freeOption = shippingOptions.find(
        (o) => o.freeAboveSubtotalCents !== null && subtotalCents >= o.freeAboveSubtotalCents,
    );

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shippingOptions.map((option) => (
                    <Skeleton key={option.methodId} className="h-24 rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <AnimatePresence>
                {freeOption && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 4 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-medium text-green-700 overflow-hidden"
                    >
                        Your order qualifies for free {freeOption.label.toLowerCase()} shipping!
                    </motion.p>
                )}
            </AnimatePresence>

            <Controller
                control={control}
                name="shippingMethod"
                render={({ field }) => (
                    <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                        {shippingOptions.map((option) => {
                            const isSelected = field.value === option.methodId;
                            const isFree =
                                option.freeAboveSubtotalCents !== null &&
                                subtotalCents >= option.freeAboveSubtotalCents;

                            return (
                                <label key={option.methodId} className="cursor-pointer">
                                    <RadioGroupItem value={option.methodId} className="sr-only" />
                                    <div
                                        className={cn(
                                            "flex flex-col gap-1.5 p-4 rounded-2xl border transition-all duration-150",
                                            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gray-950 has-[:focus-visible]:ring-offset-2",
                                            isSelected
                                                ? "border-gray-950 bg-gray-100"
                                                : "border-gray-200 bg-white hover:border-gray-300",
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-950">{option.label}</span>

                                            <div
                                                className={cn(
                                                    "w-4.5 h-4.5 rounded-full border-2 grid place-items-center shrink-0 transition-all duration-150",
                                                    isSelected
                                                        ? "border-gray-950 bg-gray-950"
                                                        : "border-gray-300 bg-white",
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
                                                className={cn(
                                                    "text-sm font-bold",
                                                    isFree ? "text-green-700" : "text-gray-950",
                                                )}
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
                    </RadioGroup>
                )}
            />
        </div>
    );
}
