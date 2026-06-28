import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutPaymentView } from "@/features/checkout/ui/checkout-payment-view";

export const metadata: Metadata = {
    title: "Payment",
};

export default async function PaymentPage() {
    const cookieStore = await cookies();
    const email = cookieStore.get("checkout-email")?.value;

    if (!email) {
        redirect("/checkout");
    }

    return (
        <main className="py-8">
            <h1 className="text-2xl font-bold text-gray-950 mb-6 text-center">Payment</h1>
            <CheckoutPaymentView />
        </main>
    );
}
