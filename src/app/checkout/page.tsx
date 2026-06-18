import type { Metadata } from "next";
import { getShippingOptions } from "@/features/checkout/server/shipping.queries";
import { CheckoutForm } from "@/features/checkout/ui/checkout-form";

export const metadata: Metadata = {
    title: "Checkout",
};

export default async function CheckoutPage() {
    const shippingOptions = await getShippingOptions();

    return (
        <main className="py-8">
            <h1 className="text-2xl font-bold text-gray-950 mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-x-16 gap-y-8">
                <CheckoutForm shippingOptions={shippingOptions} />
                {/* Order summary — coming in the next task */}
                <div className="hidden lg:block" />
            </div>
        </main>
    );
}
