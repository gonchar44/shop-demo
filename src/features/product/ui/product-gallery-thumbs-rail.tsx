"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "@/shared/ui/button";
import { ProductGalleryThumbItem } from "@/features/product/ui/product-gallery-thumb-item";

type ProductGalleryThumbsRailProps = {
    images: string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    name: string;
};

export function ProductGalleryThumbsRail({ images, selectedIndex, onSelect, name }: ProductGalleryThumbsRailProps) {
    const railRef = useRef<HTMLDivElement>(null);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        const updateScrollState = () => {
            setCanScrollUp(rail.scrollTop > 0);
            setCanScrollDown(rail.scrollTop + rail.clientHeight < rail.scrollHeight - 1);
        };

        updateScrollState();
        rail.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);
        return () => {
            rail.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [images]);

    const scrollByPage = (direction: 1 | -1) => {
        const rail = railRef.current;
        if (!rail) return;
        rail.scrollBy({ top: direction * rail.clientHeight * 0.8, behavior: "smooth" });
    };

    const showArrows = canScrollUp || canScrollDown;

    return (
        <div className="hidden sm:flex flex-col items-center gap-2">
            {showArrows && (
                <Button
                    variant="outlined"
                    size="icon-sm"
                    shape="circle"
                    aria-label="Scroll thumbnails up"
                    disabled={!canScrollUp}
                    onClick={() => scrollByPage(-1)}
                >
                    <ChevronUp className="size-4" />
                </Button>
            )}

            <RadioGroup.Root
                ref={railRef}
                value={String(selectedIndex)}
                onValueChange={(value) => onSelect(Number(value))}
                orientation="vertical"
                loop={false}
                aria-label={`${name} thumbnails`}
                className="flex max-h-96 w-20 flex-col gap-2 overflow-y-auto scroll-smooth scrollbar-hide"
            >
                {images.map((image, index) => (
                    <ProductGalleryThumbItem
                        key={image + index}
                        image={image}
                        index={index}
                        total={images.length}
                        name={name}
                    />
                ))}
            </RadioGroup.Root>

            {showArrows && (
                <Button
                    variant="outlined"
                    size="icon-sm"
                    shape="circle"
                    aria-label="Scroll thumbnails down"
                    disabled={!canScrollDown}
                    onClick={() => scrollByPage(1)}
                >
                    <ChevronDown className="size-4" />
                </Button>
            )}
        </div>
    );
}
