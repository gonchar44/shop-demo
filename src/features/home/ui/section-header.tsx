"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";

type SectionHeaderAction = {
    label: string;
    href: string;
};

type SectionHeaderProps = {
    eyebrow: string;
    heading: string;
    action?: SectionHeaderAction;
};

export function SectionHeader({ eyebrow, heading, action }: SectionHeaderProps) {
    return (
        <motion.div
            className="flex items-end justify-between gap-4"
            variants={fadeUpContainer}
            initial="hidden"
            animate="visible"
        >
            <div>
                <motion.p className="text-xs font-medium tracking-widest text-gray-400 uppercase" variants={fadeUpItem}>
                    {eyebrow}
                </motion.p>
                <motion.h2
                    className="font-bold text-2xl md:text-3xl leading-none tracking-tight text-gray-950 mt-2"
                    variants={fadeUpItem}
                >
                    {heading}
                </motion.h2>
            </div>

            {action && (
                <motion.div variants={fadeUpItem}>
                    <Link
                        href={action.href}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-950 transition-colors duration-200 hover:text-gray-600"
                    >
                        {action.label}
                        <span
                            className="transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                        >
                            <ArrowRightIcon className="size-4" />
                        </span>
                    </Link>
                </motion.div>
            )}
        </motion.div>
    );
}
