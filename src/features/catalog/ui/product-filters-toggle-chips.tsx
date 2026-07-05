"use client";

import { PackageCheckIcon, SparklesIcon, StarIcon, TagIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import type { BooleanFilterKey } from "@/features/catalog/lib/filter-params";

type ProductFiltersToggleChipsProps = {
    inStock: boolean;
    isNew: boolean;
    onSale: boolean;
    featured: boolean;
    onChange: (next: { inStock: boolean; isNew: boolean; onSale: boolean; featured: boolean }) => void;
};

const CHIPS: { key: BooleanFilterKey; label: string; icon: typeof PackageCheckIcon }[] = [
    { key: "inStock", label: "In stock", icon: PackageCheckIcon },
    { key: "isNew", label: "New", icon: SparklesIcon },
    { key: "onSale", label: "Deals", icon: TagIcon },
    { key: "featured", label: "Featured", icon: StarIcon },
];

export function ProductFiltersToggleChips({
    inStock,
    isNew,
    onSale,
    featured,
    onChange,
}: ProductFiltersToggleChipsProps) {
    const state: Record<BooleanFilterKey, boolean> = { inStock, isNew, onSale, featured };

    return (
        <div className="px-5 py-4">
            <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-3">Quick filters</p>
            <div className="flex flex-wrap gap-2">
                {CHIPS.map(({ key, label, icon: Icon }) => {
                    const active = state[key];
                    return (
                        <Button
                            key={key}
                            type="button"
                            variant={active ? "primary" : "secondary"}
                            size="sm"
                            aria-pressed={active}
                            onClick={() => onChange({ ...state, [key]: !active })}
                        >
                            <Icon className="size-3.5" strokeWidth={2} />
                            {label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
