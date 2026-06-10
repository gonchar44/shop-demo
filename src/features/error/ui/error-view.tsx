"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RefreshCcwIcon, ArrowRightIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";
import { buttonVariants } from "@/shared/ui/button";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type ErrorViewProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export function ErrorView({ error, reset }: ErrorViewProps) {
    return (
        <main className="flex-1 flex flex-col justify-center bg-white py-6">
            <motion.div variants={fadeUpContainer} initial="hidden" animate="visible">
                {/* Top rule */}
                <motion.div className="border-t border-gray-200 mb-12" variants={fadeUpItem} />

                {/* Content cluster */}
                <div className="flex flex-col gap-6">
                    {/* Label */}
                    <motion.p
                        className="text-xs font-medium tracking-widest text-gray-400 uppercase"
                        variants={fadeUpItem}
                    >
                        Unexpected error
                    </motion.p>

                    {/* Display headline */}
                    <motion.h1
                        className="font-mono font-bold leading-none tracking-tight text-gray-950"
                        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                        variants={fadeUpItem}
                    >
                        Something
                        <br />
                        Broke.
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p className="text-sm text-gray-500 leading-relaxed max-w-xs" variants={fadeUpItem}>
                        This shouldn&apos;t have happened.
                        <br />
                        You can try again or go back home.
                    </motion.p>

                    {/* Error digest — dev only */}
                    {process.env.NODE_ENV === "development" && error.digest && (
                        <motion.p className="text-xs text-gray-400 font-mono" variants={fadeUpItem}>
                            digest: {error.digest}
                        </motion.p>
                    )}

                    {/* CTAs */}
                    <motion.div className="flex items-center gap-3" variants={fadeUpItem}>
                        <Button variant="primary" size="md" onClick={reset} className="group">
                            <span
                                className="transition-transform duration-200 group-hover:-rotate-180"
                                aria-hidden="true"
                            >
                                <RefreshCcwIcon className="size-4" />
                            </span>
                            Try again
                        </Button>

                        <Link href="/" className={cn(buttonVariants({ variant: "secondary", size: "md" }), "group")}>
                            Go Home
                            <span
                                className="transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                            >
                                <ArrowRightIcon className="size-4" />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom rule */}
                <motion.div className="border-t border-gray-200 mt-12" variants={fadeUpItem} />
            </motion.div>
        </main>
    );
}
