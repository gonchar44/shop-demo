"use client";

import { motion } from "motion/react";

type CountBadgeProps = {
    count: number;
};

export function CountBadge({ count }: CountBadgeProps) {
    if (count <= 0) return null;

    return (
        <motion.span
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1.5 bg-gray-950 text-white rounded-full text-xs font-mono font-bold grid place-items-center border-2 border-white pointer-events-none"
        >
            {count}
        </motion.span>
    );
}
