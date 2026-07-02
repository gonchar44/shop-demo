"use client";

import { Input } from "@/shared/ui/input";

type ProductFiltersPriceRangeProps = {
    minPriceCents?: number;
    maxPriceCents?: number;
    bounds: { minCents: number; maxCents: number };
    onChange: (minPriceCents: number | undefined, maxPriceCents: number | undefined) => void;
};

function toCentsOrUndefined(value: string): number | undefined {
    if (value.trim() === "") return undefined;
    const dollars = Number(value);
    if (!Number.isFinite(dollars) || dollars < 0) return undefined;
    return Math.round(dollars * 100);
}

function toDollarsInputValue(cents: number | undefined): string {
    return cents !== undefined ? String(cents / 100) : "";
}

export function ProductFiltersPriceRange({
    minPriceCents,
    maxPriceCents,
    bounds,
    onChange,
}: ProductFiltersPriceRangeProps) {
    return (
        <div className="px-5 py-4">
            <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-3">Price</p>
            <div className="flex items-center gap-3">
                <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder={String(Math.floor(bounds.minCents / 100))}
                    value={toDollarsInputValue(minPriceCents)}
                    onChange={(e) => onChange(toCentsOrUndefined(e.target.value), maxPriceCents)}
                    aria-label="Minimum price"
                />
                <span className="text-gray-400 text-sm" aria-hidden={true}>
                    –
                </span>
                <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder={String(Math.ceil(bounds.maxCents / 100))}
                    value={toDollarsInputValue(maxPriceCents)}
                    onChange={(e) => onChange(minPriceCents, toCentsOrUndefined(e.target.value))}
                    aria-label="Maximum price"
                />
            </div>
        </div>
    );
}
