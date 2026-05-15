export function formatPrice(cents: number, currency: string): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(cents / 100);
}

export function getDiscountPercent(priceCents: number, compareAtCents: number): string | null {
    if (priceCents >= compareAtCents) return null;
    const discount = Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
    return `-${discount}%`;
}
