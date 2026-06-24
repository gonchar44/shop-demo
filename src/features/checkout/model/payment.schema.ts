import { z } from "zod";

export const paymentSchema = z.object({
    cardNumber: z.string().refine(
        (val) => /^\d{16}$/.test(val.replace(/\s/g, "")),
        "Card number must be 16 digits",
    ),
    cardholderName: z.string().trim().min(1, "Cardholder name is required"),
    expiry: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY")
        .refine((val) => {
            const [month, year] = val.split("/");
            const expiry = new Date(2000 + parseInt(year), parseInt(month), 1);
            return expiry > new Date();
        }, "Card has expired"),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
