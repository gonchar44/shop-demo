"use client";

import { motion } from "motion/react";
import { WifiOffIcon, SearchXIcon, PackageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";

type Variant = "error" | "no-results" | "empty-catalog";

type ProductListEmptyProps = {
    variant: Variant;
    onRetry?: () => void;
    onClearSearch?: () => void;
};

type VariantConfig = {
    Icon: LucideIcon;
    heading: string;
    subtext: string;
};

const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
    error: {
        Icon: WifiOffIcon,
        heading: "Something went wrong",
        subtext: "We couldn't load the products. Please try again.",
    },
    "no-results": {
        Icon: SearchXIcon,
        heading: "No products found",
        subtext: "Try different keywords or clear the search.",
    },
    "empty-catalog": {
        Icon: PackageIcon,
        heading: "No products here yet",
        subtext: "Check back soon — more products are on the way.",
    },
};

export function ProductListEmpty({ variant, onRetry, onClearSearch }: ProductListEmptyProps) {
    const { Icon, heading, subtext } = VARIANT_CONFIG[variant];

    return (
        <motion.div
            className="py-20 flex flex-col items-center gap-6"
            variants={fadeUpContainer}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="bg-gray-100 rounded-3xl w-24 h-24 flex items-center justify-center"
                variants={fadeUpItem}
            >
                <Icon className="size-10 text-gray-400" strokeWidth={1.5} />
            </motion.div>

            <motion.div className="flex flex-col items-center gap-2" variants={fadeUpItem}>
                <h2 className="font-mono font-bold text-3xl text-gray-950">{heading}</h2>
                <p className="text-sm text-gray-500 text-center max-w-xs">{subtext}</p>
            </motion.div>

            {variant === "error" && onRetry && (
                <motion.button
                    type="button"
                    onClick={onRetry}
                    className="cursor-pointer bg-gray-950 text-white rounded-2xl px-6 py-3 text-sm font-bold hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                    variants={fadeUpItem}
                >
                    Try again
                </motion.button>
            )}

            {variant === "no-results" && onClearSearch && (
                <motion.button
                    type="button"
                    onClick={onClearSearch}
                    className="cursor-pointer bg-gray-950 text-white rounded-2xl px-6 py-3 text-sm font-bold hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                    variants={fadeUpItem}
                >
                    Clear search
                </motion.button>
            )}
        </motion.div>
    );
}
