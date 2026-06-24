import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckoutPaymentView } from "@/features/checkout/ui/checkout-payment-view";

export const metadata: Metadata = {
    title: "Payment",
};

type PaymentPageProps = {
    searchParams: Promise<{ email?: string }>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
    const { email } = await searchParams;

    if (!email) {
        redirect("/checkout");
    }

    return (
        <main className="py-8">
            <h1 className="text-2xl font-bold text-gray-950 mb-6 text-center">Payment</h1>
            <CheckoutPaymentView email={email} />
        </main>
    );
}
