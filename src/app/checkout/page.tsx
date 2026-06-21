import type { Metadata } from "next";
import { getShippingOptions } from "@/features/checkout/server/shipping.queries";
import { CheckoutClientLayout } from "@/features/checkout/ui/checkout-client-layout";

export const metadata: Metadata = {
    title: "Checkout",
};

export default async function CheckoutPage() {
    const shippingOptions = await getShippingOptions();

    return (
        <main className="py-8">
            <h1 className="text-2xl font-bold text-gray-950 mb-8">Checkout</h1>
            <CheckoutClientLayout shippingOptions={shippingOptions} />
        </main>
    );
}
