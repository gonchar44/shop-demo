"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";

// TODO: It's temporary content. Replace it with real content.
export function HomeHero() {
    return (
        <main className="flex-1 flex flex-col justify-center bg-white p-6">
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
                        Shop Demo
                    </motion.p>

                    {/* Display headline */}
                    <motion.h1
                        className="font-mono font-bold leading-none tracking-tight text-gray-950"
                        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                        variants={fadeUpItem}
                    >
                        Coming
                        <br />
                        Soon
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p className="text-sm text-gray-500 leading-relaxed max-w-xs" variants={fadeUpItem}>
                        A new shopping experience is on its way.
                        <br />
                        For now, explore what&apos;s already here.
                    </motion.p>

                    {/* CTA */}
                    <motion.div className="w-fit" variants={fadeUpItem}>
                        <Link
                            href="/catalog"
                            className="group inline-flex items-center gap-2 w-fit px-6 py-3 bg-gray-950 text-white text-sm font-bold rounded-2xl transition-colors duration-200 hover:bg-gray-800"
                        >
                            Browse the Catalog
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
