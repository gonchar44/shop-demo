import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutConfirmation } from "@/features/checkout/ui/checkout-confirmation";

export const metadata: Metadata = {
    title: "Order Confirmed",
};

type ConfirmationPageProps = {
    searchParams: Promise<{ orderRef?: string }>;
};

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
    const { orderRef } = await searchParams;

    const cookieStore = await cookies();
    const raw = cookieStore.get("order-confirmation")?.value;

    let email: string | undefined;
    // Safely parse the order-confirmation cookie and use its email only if it matches this orderRef.
    if (raw) {
        try {
            const parsed: unknown = JSON.parse(raw);
            if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
                const data = parsed as Record<string, unknown>;
                if (typeof data.orderRef === "string" && typeof data.email === "string" && data.orderRef === orderRef) {
                    email = data.email;
                }
            }
        } catch {
            // malformed cookie — fall through to redirect
        }
    }

    if (!orderRef || !email) {
        redirect("/checkout");
    }

    return (
        <main className="py-8">
            <CheckoutConfirmation orderRef={orderRef} email={email} />
        </main>
    );
}
