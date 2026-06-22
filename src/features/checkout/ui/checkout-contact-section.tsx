import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormValues } from "@/features/checkout/model/checkout.types";
import { CheckoutField } from "@/features/checkout/ui/checkout-field";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

type CheckoutContactSectionProps = {
    register: UseFormRegister<CheckoutFormValues>;
    errors: FieldErrors<CheckoutFormValues>;
};

export function CheckoutContactSection({ register, errors }: CheckoutContactSectionProps) {
    return (
        <div className="flex flex-col gap-5">
            <CheckoutField label="Email" htmlFor="email" error={errors.email?.message}>
                <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(errors.email && "border-destructive")}
                    {...register("email")}
                />
            </CheckoutField>
        </div>
    );
}
