"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import type { ProductAttribute } from "@/features/catalog/model/product.types";

type ProductMaterialPickerProps = {
    options: ProductAttribute[];
};

export function ProductMaterialPicker({ options }: ProductMaterialPickerProps) {
    const [selectedSlug, setSelectedSlug] = useState(options[0]?.slug ?? "");

    if (options.length === 0) return null;

    return (
        <div>
            <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-3">Material</p>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <Button
                        key={option.id}
                        type="button"
                        variant={option.slug === selectedSlug ? "primary" : "outlined"}
                        size="sm"
                        shape="circle"
                        aria-pressed={option.slug === selectedSlug}
                        onClick={() => setSelectedSlug(option.slug)}
                    >
                        {option.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
