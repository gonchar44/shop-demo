"use client";

import Link from "next/link";
import { CheckCircle2Icon, ArrowRightIcon, HomeIcon } from "lucide-react";
import { motion } from "motion/react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";
import { buttonVariants } from "@/shared/ui/button";

type CheckoutConfirmationProps = {
    orderRef: string;
    email: string;
};

export function CheckoutConfirmation({ orderRef, email }: CheckoutConfirmationProps) {
    return (
        <motion.div
            variants={fadeUpContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-6 py-12 max-w-md mx-auto"
        >
            <motion.div
                variants={fadeUpItem}
                className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full"
            >
                <CheckCircle2Icon className="size-8 text-gray-950" strokeWidth={1.5} />
            </motion.div>

            <motion.div variants={fadeUpItem} className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-950">Order confirmed</h1>
                <p className="text-sm text-gray-500">
                    A confirmation will be sent to <span className="text-gray-700 font-medium">{email}</span>
                </p>
            </motion.div>

            <motion.div variants={fadeUpItem}>
                <span className="font-mono bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl tracking-widest">
                    {orderRef}
                </span>
            </motion.div>

            <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link href="/catalog" className={buttonVariants({ variant: "primary", size: "md" })}>
                    <ArrowRightIcon className="size-4.5" strokeWidth={1.9} />
                    Continue Shopping
                </Link>
                <Link href="/" className={buttonVariants({ variant: "secondary", size: "md" })}>
                    <HomeIcon className="size-4.5" strokeWidth={1.9} />
                    Back to Home
                </Link>
            </motion.div>
        </motion.div>
    );
}
