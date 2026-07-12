"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { ProductGalleryThumbItem } from "@/features/product/ui/product-gallery-thumb-item";

type ProductGalleryThumbsStripProps = {
    images: string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    name: string;
};

export function ProductGalleryThumbsStrip({ images, selectedIndex, onSelect, name }: ProductGalleryThumbsStripProps) {
    return (
        <RadioGroup.Root
            value={String(selectedIndex)}
            onValueChange={(value) => onSelect(Number(value))}
            orientation="horizontal"
            loop={false}
            aria-label={`${name} thumbnails`}
            className="flex sm:hidden w-full gap-2 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
            {images.map((image, index) => (
                <ProductGalleryThumbItem
                    key={image + index}
                    image={image}
                    index={index}
                    total={images.length}
                    name={name}
                    className="snap-start"
                />
            ))}
        </RadioGroup.Root>
    );
}
