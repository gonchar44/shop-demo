type ProductSpecsProps = {
    dimensions: string | null;
    materialDetail: string | null;
    bulbBase: string | null;
    origin: string | null;
    weight: string | null;
};

export function ProductSpecs({ dimensions, materialDetail, bulbBase, origin, weight }: ProductSpecsProps) {
    const rows = [
        { label: "Dimensions", value: dimensions },
        { label: "Material", value: materialDetail },
        { label: "Bulb base", value: bulbBase },
        { label: "Origin", value: origin },
        { label: "Weight", value: weight },
    ].filter((row): row is { label: string; value: string } => row.value !== null);

    if (rows.length === 0) return null;

    return (
        <div className="border-t border-gray-200 pt-4 flex flex-col divide-y divide-gray-100">
            {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-medium text-gray-950">{row.value}</span>
                </div>
            ))}
        </div>
    );
}
