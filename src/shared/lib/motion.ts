import type { Variants } from "motion/react";

export const fadeUpContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

export const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
