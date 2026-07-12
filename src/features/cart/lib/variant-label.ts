import type { CartLine } from "@/features/cart/model/cart-line.types";

export function formatVariantLabel(line: CartLine): string | null {
    const parts = [line.color?.name, line.material?.name].filter((part): part is string => Boolean(part));
    return parts.length > 0 ? parts.join(" · ") : line.variantName;
}
