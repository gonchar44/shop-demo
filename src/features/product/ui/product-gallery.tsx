"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import { ProductGalleryThumbs } from "@/features/product/ui/product-gallery-thumbs";

type ProductGalleryProps = {
    images: string[];
    name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const hasMultiple = images.length > 1;

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {hasMultiple && (
                <ProductGalleryThumbs
                    images={images}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    name={name}
                />
            )}

            <div className="relative order-1 aspect-square w-full flex-1 overflow-hidden rounded-2xl bg-gray-50 sm:order-2 sm:max-w-xl">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center p-8"
                    >
                        <ImageWithFallback
                            src={images[selectedIndex]}
                            alt={`${name} - image ${selectedIndex + 1} of ${images.length}`}
                            width={800}
                            height={800}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading={selectedIndex === 0 ? "eager" : "lazy"}
                            className="rounded-lg max-h-full max-w-full object-contain"
                            iconClassName="size-16"
                            label="No image"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
