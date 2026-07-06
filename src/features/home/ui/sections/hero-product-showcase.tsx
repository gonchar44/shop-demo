"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import { formatPrice } from "@/features/catalog/lib/price";
import { fadeUpContainer, fadeUpItem } from "@/shared/lib/motion";
import type { ProductListItem } from "@/features/catalog/model/product.types";

type HeroProductShowcaseProps = {
    product: ProductListItem;
};

export function HeroProductShowcase({ product }: HeroProductShowcaseProps) {
    const { name, thumbnail, priceCents, currency, category } = product;

    return (
        <motion.div className="relative pb-6" variants={fadeUpContainer} initial="hidden" animate="visible">
            <motion.div
                className="relative aspect-square md:aspect-4/3 rounded-3xl bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-8"
                variants={fadeUpItem}
            >
                <ImageWithFallback
                    loading="eager"
                    src={thumbnail}
                    alt={name}
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="max-w-full max-h-full object-contain"
                    iconClassName="size-10"
                    label="No image"
                />
            </motion.div>

            <motion.div
                className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-3xl bg-white shadow-xl p-4 max-w-xs"
                variants={fadeUpItem}
            >
                <div className="size-14 shrink-0 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <ImageWithFallback
                        src={thumbnail}
                        alt={name}
                        width={56}
                        height={56}
                        className="max-w-full max-h-full object-contain"
                        iconClassName="size-5"
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 leading-none">
                        {category.name}
                    </p>
                    <h3 className="font-bold text-sm text-gray-950 truncate mt-1">{name}</h3>
                </div>
                <span className="text-sm font-semibold text-gray-950 shrink-0">
                    {formatPrice(priceCents, currency)}
                </span>
            </motion.div>
        </motion.div>
    );
}
