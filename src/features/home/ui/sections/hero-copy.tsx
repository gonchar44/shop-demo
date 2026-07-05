"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function HeroCopy() {
    return (
        <motion.div variants={fadeUpContainer} initial="hidden" animate="visible">
            <motion.p className="text-xs font-medium tracking-widest text-gray-400 uppercase" variants={fadeUpItem}>
                New Arrivals · Curated Edit
            </motion.p>
            <motion.h1
                className="font-bold text-4xl md:text-6xl leading-tight tracking-tight text-gray-950 mt-4"
                variants={fadeUpItem}
            >
                Rooms that breathe softly.
            </motion.h1>
            <motion.p className="text-gray-500 max-w-sm mt-4" variants={fadeUpItem}>
                A quiet collection of lighting, textiles, and small objects — chosen for warmth, restraint, and the way
                light falls across a room.
            </motion.p>
            <motion.div variants={fadeUpItem}>
                <Link
                    href="/catalog"
                    className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full md:w-auto group mt-8")}
                >
                    Explore the catalog
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        <ArrowRightIcon className="size-4" />
                    </span>
                </Link>
            </motion.div>
        </motion.div>
    );
}
