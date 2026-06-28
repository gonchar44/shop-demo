import { z } from "zod";

export const checkoutSchema = z.object({
    email: z.email("Enter a valid email address"),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    address: z.string().trim().min(1, "Address is required"),
    addressLine2: z.string().trim().optional(),
    city: z.string().trim().min(1, "City is required"),
    country: z.string().trim().min(1, "Country is required"),
    postalCode: z.string().trim().min(1, "Postal code is required"),
    shippingMethod: z.enum(["standard", "express"]),
});
