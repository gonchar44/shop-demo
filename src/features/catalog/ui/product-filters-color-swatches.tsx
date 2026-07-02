"use client";

import { CheckIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
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
            <div className="flex flex-wrap gap-2.5">
                {options.map((option) => {
                    const isSelected = selected.includes(option.slug);
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => toggle(option.slug)}
                            aria-pressed={isSelected}
                            aria-label={option.name}
                            title={option.name}
                            className={cn(
                                "relative size-8 rounded-full border transition-all duration-150 cursor-pointer",
                                isSelected
                                    ? "border-gray-950 ring-2 ring-gray-950 ring-offset-2"
                                    : "border-gray-200 hover:border-gray-400",
                            )}
                            style={{ backgroundColor: option.hex ?? undefined }}
                        >
                            {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex items-center justify-center size-4 rounded-full bg-white shadow-sm">
                                        <CheckIcon className="size-2.5 text-gray-950" strokeWidth={3} />
                                    </span>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
