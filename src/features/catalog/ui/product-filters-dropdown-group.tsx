"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import type { ProductAttribute } from "@/features/catalog/model/product.types";

type ProductFiltersDropdownGroupProps = {
    label: string;
    options: ProductAttribute[];
    selected: string[];
    onChange: (next: string[]) => void;
};

export function ProductFiltersDropdownGroup({ label, options, selected, onChange }: ProductFiltersDropdownGroupProps) {
    if (options.length === 0) return null;

    function toggle(slug: string) {
        onChange(selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug]);
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild={true}>
                <Button
                    type="button"
                    variant={selected.length > 0 ? "primary" : "secondary"}
                    size="sm"
                    className="group justify-between"
                >
                    {selected.length > 0 ? `${label} (${selected.length})` : label}
                    <ChevronDownIcon
                        className="size-3.5 transition-transform duration-150 group-data-[state=open]:rotate-180"
                        strokeWidth={2}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.id}
                        checked={selected.includes(option.slug)}
                        onCheckedChange={() => toggle(option.slug)}
                    >
                        {option.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
