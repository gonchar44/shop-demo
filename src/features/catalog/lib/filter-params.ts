import type { ProductFilterOptions, ProductListParams } from "@/features/catalog/model/product.types";

export const ARRAY_FILTER_KEYS = ["category", "room", "style", "material", "color"] as const;
export const BOOLEAN_FILTER_KEYS = ["inStock", "isNew", "onSale", "featured"] as const;

export type ArrayFilterKey = (typeof ARRAY_FILTER_KEYS)[number];
export type BooleanFilterKey = (typeof BOOLEAN_FILTER_KEYS)[number];

export type CatalogFilterDraft = {
    category: string[];
    room: string[];
    style: string[];
    material: string[];
    color: string[];
    minPriceCents?: number;
    maxPriceCents?: number;
    inStock: boolean;
    isNew: boolean;
    onSale: boolean;
    featured: boolean;
};

const emptyArrayFields = Object.fromEntries(
    ARRAY_FILTER_KEYS.map((key): [ArrayFilterKey, string[]] => [key, []]),
) as Record<ArrayFilterKey, string[]>;
const emptyBooleanFields = Object.fromEntries(
    BOOLEAN_FILTER_KEYS.map((key): [BooleanFilterKey, boolean] => [key, false]),
) as Record<BooleanFilterKey, boolean>;

export const EMPTY_FILTER_DRAFT: CatalogFilterDraft = {
    ...emptyArrayFields,
    ...emptyBooleanFields,
    minPriceCents: undefined,
    maxPriceCents: undefined,
};

function parseSlugList(searchParams: URLSearchParams, key: string): string[] {
    const raw = searchParams.get(key);
    if (!raw) return [];
    return Array.from(
        new Set(
            raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        ),
    );
}

function isValidPrice(price: number | undefined): price is number {
    return price !== undefined && Number.isFinite(price) && price >= 0;
}

export function parseFilterDraft(searchParams: URLSearchParams): CatalogFilterDraft {
    const minPriceRaw = searchParams.get("minPriceCents");
    const maxPriceRaw = searchParams.get("maxPriceCents");

    const minPriceNum = minPriceRaw ? Number(minPriceRaw) : undefined;
    const maxPriceNum = maxPriceRaw ? Number(maxPriceRaw) : undefined;

    const arrayFields = Object.fromEntries(
        ARRAY_FILTER_KEYS.map((key) => [key, parseSlugList(searchParams, key)]),
    ) as Record<ArrayFilterKey, string[]>;
    const booleanFields = Object.fromEntries(
        BOOLEAN_FILTER_KEYS.map((key) => [key, searchParams.get(key) === "1"]),
    ) as Record<BooleanFilterKey, boolean>;

    return {
        ...arrayFields,
        ...booleanFields,
        minPriceCents: isValidPrice(minPriceNum) ? minPriceNum : undefined,
        maxPriceCents: isValidPrice(maxPriceNum) ? maxPriceNum : undefined,
    };
}

export function countActiveFilters(draft: CatalogFilterDraft): number {
    const arrayCount = ARRAY_FILTER_KEYS.reduce((sum, key) => sum + draft[key].length, 0);
    const booleanCount = BOOLEAN_FILTER_KEYS.reduce((sum, key) => sum + (draft[key] ? 1 : 0), 0);
    const priceCount = draft.minPriceCents !== undefined || draft.maxPriceCents !== undefined ? 1 : 0;

    return arrayCount + booleanCount + priceCount;
}

export function hasActiveCatalogFilters(params: ProductListParams): boolean {
    return Boolean(
        params.q ||
        ARRAY_FILTER_KEYS.some((key) => params[key]?.length) ||
        BOOLEAN_FILTER_KEYS.some((key) => params[key]) ||
        params.minPriceCents !== undefined ||
        params.maxPriceCents !== undefined,
    );
}

type FilterFields = Partial<Record<ArrayFilterKey, string[]>> &
    Partial<Record<BooleanFilterKey, boolean>> & {
        minPriceCents?: number;
        maxPriceCents?: number;
    };

export function appendFilterParams(target: URLSearchParams, filters: FilterFields): void {
    function setOrDelete(key: string, value: string | undefined) {
        if (value) {
            target.set(key, value);
        } else {
            target.delete(key);
        }
    }

    for (const key of ARRAY_FILTER_KEYS) {
        setOrDelete(key, filters[key]?.join(","));
    }
    for (const key of BOOLEAN_FILTER_KEYS) {
        setOrDelete(key, filters[key] ? "1" : undefined);
    }
    setOrDelete("minPriceCents", isValidPrice(filters.minPriceCents) ? String(filters.minPriceCents) : undefined);
    setOrDelete("maxPriceCents", isValidPrice(filters.maxPriceCents) ? String(filters.maxPriceCents) : undefined);
}

export function buildFilterSearchParams(current: URLSearchParams, draft: CatalogFilterDraft): URLSearchParams {
    const next = new URLSearchParams(current.toString());
    appendFilterParams(next, draft);
    next.set("page", "1");

    return next;
}

export const DEFAULT_FILTER_OPTIONS: ProductFilterOptions = {
    categories: [],
    rooms: [],
    styles: [],
    materials: [],
    colors: [],
    priceBounds: {
        minCents: 0,
        maxCents: 0,
    },
};
