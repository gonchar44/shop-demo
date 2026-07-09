"use client";

import { ColorSwatches } from "@/shared/ui/color-swatches";
import type { ProductColor } from "@/features/catalog/model/product.types";

type ProductFiltersColorSwatchesProps = {
    options: ProductColor[];
    selected: string[];
    onChange: (next: string[]) => void;
};

export function ProductFiltersColorSwatches({ options, selected, onChange }: ProductFiltersColorSwatchesProps) {
    if (options.length === 0) return null;

    function toggle(slug: string) {
        onChange(selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug]);
    }

    return (
        <div className="px-5 py-4">
            <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-3">Color</p>
            <ColorSwatches options={options} selected={selected} onSelect={toggle} />
        </div>
    );
}
