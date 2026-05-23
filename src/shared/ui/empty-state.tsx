"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";

type EmptyStateProps = {
    icon: LucideIcon;
    heading: string;
    subtext: string;
    action?: React.ReactNode;
};

export function EmptyState({ icon: Icon, heading, subtext, action }: EmptyStateProps) {
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

            {action && <motion.div variants={fadeUpItem}>{action}</motion.div>}
        </motion.div>
    );
}
