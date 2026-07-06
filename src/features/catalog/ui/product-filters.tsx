"use client";

import { useState } from "react";
import { Settings2Icon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CountBadge } from "@/shared/ui/count-badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { countActiveFilters, parseFilterDraft } from "@/features/catalog/lib/filter-params";
import type { ProductFilterOptions } from "@/features/catalog/model/product.types";
import { ProductFiltersPanel } from "@/features/catalog/ui/product-filters-panel";

type ProductFiltersProps = {
    options: ProductFilterOptions;
};

export function ProductFilters({ options }: ProductFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const activeCount = countActiveFilters(parseFilterDraft(searchParams));

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild={true}>
                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    aria-label="Filters"
                    className={cn("relative gap-2", isOpen && "opacity-50")}
                >
                    <Settings2Icon className="size-4" strokeWidth={2} />
                    Filters
                    <CountBadge count={activeCount} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                forceMount={true}
                align="end"
                sideOffset={10}
                collisionPadding={24}
                className="p-0 border-0 shadow-none w-auto bg-transparent"
            >
                <AnimatePresence>
                    {isOpen && <ProductFiltersPanel options={options} onClose={() => setIsOpen(false)} />}
                </AnimatePresence>
            </PopoverContent>
        </Popover>
    );
}
