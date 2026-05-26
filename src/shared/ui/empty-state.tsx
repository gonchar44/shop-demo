"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";
import { cn } from "@/shared/lib/utils";

const sizeMap = {
    default: {
        container: "py-20 gap-6",
        iconWrap: "w-24 h-24 rounded-3xl",
        icon: "size-10",
        textWrap: "gap-2",
        heading: "text-3xl",
    },
    sm: {
        container: "py-10 gap-4",
        iconWrap: "w-16 h-16 rounded-2xl",
        icon: "size-7",
        textWrap: "gap-1.5",
        heading: "text-xl",
    },
};

type EmptyStateProps = {
    icon: LucideIcon;
    heading: string;
    subtext: string;
    action?: ReactNode;
    size?: keyof typeof sizeMap;
};

export function EmptyState({ icon: Icon, heading, subtext, action, size = "default" }: EmptyStateProps) {
    const s = sizeMap[size];

    return (
        <motion.div
            className={cn("flex flex-col items-center", s.container)}
            variants={fadeUpContainer}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className={cn("bg-gray-100 flex items-center justify-center", s.iconWrap)}
                variants={fadeUpItem}
            >
                <Icon className={cn("text-gray-400", s.icon)} strokeWidth={1.5} />
            </motion.div>

            <motion.div className={cn("flex flex-col items-center", s.textWrap)} variants={fadeUpItem}>
                <h2 className={cn("font-mono font-bold text-gray-950", s.heading)}>{heading}</h2>
                <p className="text-sm text-gray-500 text-center max-w-xs">{subtext}</p>
            </motion.div>

            {action && <motion.div variants={fadeUpItem}>{action}</motion.div>}
        </motion.div>
    );
}
