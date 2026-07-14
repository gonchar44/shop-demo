import { ColorSwatches } from "@/shared/ui/color-swatches";
import type { ProductColor } from "@/features/catalog/model/product.types";

type ProductColorPickerProps = {
    options: ProductColor[];
    selectedSlug: string | null;
    onSelect: (slug: string) => void;
    isOptionDisabled?: (slug: string) => boolean;
};

export function ProductColorPicker({ options, selectedSlug, onSelect, isOptionDisabled }: ProductColorPickerProps) {
    const selectedName = options.find((option) => option.slug === selectedSlug)?.name;

    if (options.length === 0) return null;

    return (
        <div>
            <div className="flex items-baseline gap-2 mb-3">
                <p className="font-mono text-xs tracking-widest uppercase text-gray-400">Color</p>
                {selectedName && <p className="text-sm font-medium text-gray-950">{selectedName}</p>}
            </div>
            <ColorSwatches
                options={options}
                selected={selectedSlug ? [selectedSlug] : []}
                onSelect={onSelect}
                isDisabled={isOptionDisabled}
            />
        </div>
    );
}
