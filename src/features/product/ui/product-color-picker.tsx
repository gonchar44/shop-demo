"use client";

import { useState } from "react";
import { ColorSwatches } from "@/shared/ui/color-swatches";
import type { ProductColor } from "@/features/catalog/model/product.types";

type ProductColorPickerProps = {
    options: ProductColor[];
};

export function ProductColorPicker({ options }: ProductColorPickerProps) {
    const [selectedSlug, setSelectedSlug] = useState(options[0]?.slug ?? "");
    const selectedName = options.find((option) => option.slug === selectedSlug)?.name;

    if (options.length === 0) return null;

    return (
        <div>
            <div className="flex items-baseline gap-2 mb-3">
                <p className="font-mono text-xs tracking-widest uppercase text-gray-400">Color</p>
                {selectedName && <p className="text-sm font-medium text-gray-950">{selectedName}</p>}
            </div>
            <ColorSwatches options={options} selected={[selectedSlug]} onSelect={setSelectedSlug} />
        </div>
    );
}
