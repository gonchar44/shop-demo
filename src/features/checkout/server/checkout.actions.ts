"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { paymentSchema } from "@/features/checkout/model/payment.schema";
import type { PaymentFormValues } from "@/features/checkout/model/payment.schema";

export async function storeCheckoutEmail(email: string): Promise<void> {
    const parsed = z.string().email().safeParse(email);
    if (!parsed.success) return;

    const cookieStore = await cookies();
    cookieStore.set("checkout-email", parsed.data, {
        httpOnly: true,
        sameSite: "strict",
        path: "/checkout/payment",
        maxAge: 60 * 5,
        secure: process.env.NODE_ENV === "production",
    });
}

type SubmitPaymentResult = { success: true; orderRef: string } | { success: false; error: string };

export async function submitMockPayment(data: PaymentFormValues, email: string): Promise<SubmitPaymentResult> {
    const result = paymentSchema.safeParse({
        ...data,
        cardNumber: data.cardNumber.replace(/\s/g, ""),
    });

    if (!result.success) {
        return { success: false, error: "Invalid payment details." };
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const suffix = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const orderRef = `ORD-${suffix}`;

    const cookieStore = await cookies();
    cookieStore.set("order-confirmation", JSON.stringify({ orderRef, email }), {
        httpOnly: true,
        sameSite: "strict",
        path: "/checkout/confirmation",
        maxAge: 60 * 5,
        secure: process.env.NODE_ENV === "production",
    });

    return { success: true, orderRef };
}
