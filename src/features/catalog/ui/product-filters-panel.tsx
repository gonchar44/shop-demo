"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { PopoverClose } from "@/shared/ui/popover";
import {
    buildFilterSearchParams,
    countActiveFilters,
    EMPTY_FILTER_DRAFT,
    parseFilterDraft,
    type CatalogFilterDraft,
} from "@/features/catalog/lib/filter-params";
import type { ProductFilterOptions } from "@/features/catalog/model/product.types";
import { ProductFiltersColorSwatches } from "@/features/catalog/ui/product-filters-color-swatches";
import { ProductFiltersDropdownGroup } from "@/features/catalog/ui/product-filters-dropdown-group";
import { ProductFiltersPriceRange } from "@/features/catalog/ui/product-filters-price-range";
import { ProductFiltersToggleChips } from "@/features/catalog/ui/product-filters-toggle-chips";

type ProductFiltersPanelProps = {
    options: ProductFilterOptions;
    onClose: () => void;
};

export function ProductFiltersPanel({ options, onClose }: ProductFiltersPanelProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [draft, setDraft] = useState<CatalogFilterDraft>(() => parseFilterDraft(searchParams));

    function patchDraft(patch: Partial<CatalogFilterDraft>) {
        setDraft((prev) => ({ ...prev, ...patch }));
    }

    function handleApply() {
        const next = buildFilterSearchParams(searchParams, draft);
        router.push(`${pathname}?${next.toString()}`);
        onClose();
    }

    function handleClearAll() {
        setDraft(EMPTY_FILTER_DRAFT);
        const next = buildFilterSearchParams(searchParams, EMPTY_FILTER_DRAFT);
        router.push(`${pathname}?${next.toString()}`);
        onClose();
    }

    const activeDraftCount = countActiveFilters(draft);

    return (
        <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top left" }}
            className="w-[min(24rem,var(--radix-popover-content-available-width))] max-h-[var(--radix-popover-content-available-height)] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
            {/* Header */}
            <div className="shrink-0 flex justify-between items-center px-5 pt-4.5 pb-3.5 border-b border-gray-200">
                <p className="font-mono text-xs tracking-widest uppercase text-gray-400">Filters</p>
                <PopoverClose asChild={true}>
                    <Button variant="outlined" size="icon-sm" shape="circle" aria-label="Close filters">
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-gray-200">
                {/*<div className="px-5 py-4 flex flex-wrap gap-2">*/}
                <div className="px-5 py-4 grid grid-cols-2 gap-2">
                    <ProductFiltersDropdownGroup
                        label="Category"
                        options={options.categories}
                        selected={draft.category}
                        onChange={(category) => patchDraft({ category })}
                    />
                    <ProductFiltersDropdownGroup
                        label="Room"
                        options={options.rooms}
                        selected={draft.room}
                        onChange={(room) => patchDraft({ room })}
                    />
                    <ProductFiltersDropdownGroup
                        label="Style"
                        options={options.styles}
                        selected={draft.style}
                        onChange={(style) => patchDraft({ style })}
                    />
                    <ProductFiltersDropdownGroup
                        label="Material"
                        options={options.materials}
                        selected={draft.material}
                        onChange={(material) => patchDraft({ material })}
                    />
                </div>
                <ProductFiltersPriceRange
                    minPriceCents={draft.minPriceCents}
                    maxPriceCents={draft.maxPriceCents}
                    bounds={options.priceBounds}
                    onChange={(minPriceCents, maxPriceCents) => patchDraft({ minPriceCents, maxPriceCents })}
                />
                <ProductFiltersColorSwatches
                    options={options.colors}
                    selected={draft.color}
                    onChange={(color) => patchDraft({ color })}
                />
                <ProductFiltersToggleChips
                    inStock={draft.inStock}
                    isNew={draft.isNew}
                    onSale={draft.onSale}
                    featured={draft.featured}
                    onChange={(next) => patchDraft(next)}
                />
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 px-5 py-4 flex items-center gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={handleClearAll}
                    disabled={activeDraftCount === 0}
                >
                    Clear all
                </Button>
                <Button type="button" variant="primary" size="md" className="flex-1" onClick={handleApply}>
                    Apply
                </Button>
            </div>
        </motion.div>
    );
}
