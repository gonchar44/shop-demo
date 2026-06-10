"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function NotFoundView() {
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
                        Nothing here
                    </motion.p>

                    {/* Display headline */}
                    <motion.h1
                        className="font-mono font-bold leading-none tracking-tight text-gray-950"
                        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                        variants={fadeUpItem}
                    >
                        Page
                        <br />
                        Not Found
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p className="text-sm text-gray-500 leading-relaxed max-w-xs" variants={fadeUpItem}>
                        This page doesn&apos;t exist.
                        <br />
                        It never did.
                    </motion.p>

                    {/* CTA */}
                    <motion.div className="w-fit" variants={fadeUpItem}>
                        <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "md" }), "group")}>
                            Go Home
                            <span
                                className="transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                            >
                                <ArrowRightIcon className="size-5" />
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
