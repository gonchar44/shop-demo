import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircleIcon, ArrowRightIcon } from "lucide-react";
import { getShippingOptions } from "@/features/checkout/server/shipping.queries";
import type { ShippingOption } from "@/features/checkout/model/checkout.types";
import { CheckoutClientLayout } from "@/features/checkout/ui/checkout-client-layout";
import { EmptyState } from "@/shared/ui/empty-state";
import { buttonVariants } from "@/shared/ui/button";

export const metadata: Metadata = {
    title: "Checkout",
};

const browseCatalogAction = (
    <Link href="/catalog" className={buttonVariants({ variant: "primary", size: "md" })}>
        <ArrowRightIcon className="size-4.5" strokeWidth={1.9} />
        Browse Catalog
    </Link>
);

export default async function CheckoutPage() {
    let shippingOptions: ShippingOption[] = [];
    let errorMessage: string | null = null;

    try {
        shippingOptions = await getShippingOptions();
        if (shippingOptions.length === 0) {
            errorMessage = "Shipping options are currently unavailable. Please try again later.";
        }
    } catch (error) {
        console.error("Failed to load shipping options:", error);
        errorMessage = "Unable to load checkout. Please try again later.";
    }

    if (errorMessage) {
        return (
            <main className="py-8">
                <EmptyState
                    icon={<AlertCircleIcon />}
                    heading="Checkout Unavailable"
                    subtext={errorMessage}
                    action={browseCatalogAction}
                />
            </main>
        );
    }

    return (
        <main className="py-8">
            <h1 className="text-2xl font-bold text-gray-950 mb-8">Checkout</h1>
            <CheckoutClientLayout shippingOptions={shippingOptions} />
        </main>
    );
}
