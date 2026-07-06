"use client";

import { motion } from "motion/react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";

export function BrandStatementSection() {
    return (
        <section className="rounded-3xl bg-gray-950 px-6 my-6 py-16 md:px-10 md:py-24">
            <motion.div
                className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
                variants={fadeUpContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.p className="text-xs font-medium tracking-widest text-gray-400 uppercase" variants={fadeUpItem}>
                    Why we&apos;re here
                </motion.p>
                <motion.h2
                    className="font-bold text-3xl md:text-5xl leading-tight tracking-tight text-white"
                    variants={fadeUpItem}
                >
                    Good taste is better shared.
                </motion.h2>
                <motion.p className="text-base md:text-lg text-gray-400" variants={fadeUpItem}>
                    We choose every piece like we&apos;re furnishing it for a friend — a considered home shouldn&apos;t
                    be a solo project.
                </motion.p>
            </motion.div>
        </section>
    );
}
