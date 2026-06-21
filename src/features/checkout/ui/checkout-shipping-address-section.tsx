import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormValues } from "@/features/checkout/model/checkout.types";
import { CheckoutField } from "@/features/checkout/ui/checkout-field";
import { CheckoutAddressAutocomplete } from "@/features/checkout/ui/checkout-address-autocomplete";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

type CheckoutShippingAddressSectionProps = {
    register: UseFormRegister<CheckoutFormValues>;
    errors: FieldErrors<CheckoutFormValues>;
};

export function CheckoutShippingAddressSection({ register, errors }: CheckoutShippingAddressSectionProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
                <CheckoutField label="First Name" htmlFor="firstName" error={errors.firstName?.message}>
                    <Input
                        id="firstName"
                        placeholder="Jane"
                        autoComplete="given-name"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        className={cn(errors.firstName && "border-destructive")}
                        {...register("firstName")}
                    />
                </CheckoutField>

                <CheckoutField label="Last Name" htmlFor="lastName" error={errors.lastName?.message}>
                    <Input
                        id="lastName"
                        placeholder="Smith"
                        autoComplete="family-name"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        className={cn(errors.lastName && "border-destructive")}
                        {...register("lastName")}
                    />
                </CheckoutField>
            </div>

            <CheckoutAddressAutocomplete />

            <CheckoutField
                label="Address Line 2"
                htmlFor="addressLine2"
                error={errors.addressLine2?.message}
                optional={true}
            >
                <Input
                    id="addressLine2"
                    placeholder="Apt, suite, unit, etc."
                    autoComplete="address-line2"
                    {...register("addressLine2")}
                />
            </CheckoutField>

            <div className="grid grid-cols-2 gap-4">
                <CheckoutField label="City" htmlFor="city" error={errors.city?.message}>
                    <Input
                        id="city"
                        placeholder="New York"
                        autoComplete="address-level2"
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "city-error" : undefined}
                        className={cn(errors.city && "border-destructive")}
                        {...register("city")}
                    />
                </CheckoutField>

                <CheckoutField label="Postal Code" htmlFor="postalCode" error={errors.postalCode?.message}>
                    <Input
                        id="postalCode"
                        placeholder="10001"
                        autoComplete="postal-code"
                        aria-invalid={!!errors.postalCode}
                        aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
                        className={cn(errors.postalCode && "border-destructive")}
                        {...register("postalCode")}
                    />
                </CheckoutField>
            </div>

            <CheckoutField label="Country" htmlFor="country" error={errors.country?.message}>
                <Input
                    id="country"
                    placeholder="United States"
                    autoComplete="country-name"
                    aria-invalid={!!errors.country}
                    aria-describedby={errors.country ? "country-error" : undefined}
                    className={cn(errors.country && "border-destructive")}
                    {...register("country")}
                />
            </CheckoutField>
        </div>
    );
}
