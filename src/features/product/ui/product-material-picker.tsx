import { Button } from "@/shared/ui/button";
import type { ProductAttribute } from "@/features/catalog/model/product.types";

type ProductMaterialPickerProps = {
    options: ProductAttribute[];
    selectedSlug: string | null;
    onSelect: (slug: string) => void;
    isOptionDisabled?: (slug: string) => boolean;
};

export function ProductMaterialPicker({
    options,
    selectedSlug,
    onSelect,
    isOptionDisabled,
}: ProductMaterialPickerProps) {
    if (options.length === 0) return null;

    return (
        <div>
            <p className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-3">Material</p>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const disabled = isOptionDisabled?.(option.slug) ?? false;
                    return (
                        <Button
                            key={option.id}
                            type="button"
                            variant={option.slug === selectedSlug ? "primary" : "outlined"}
                            size="sm"
                            shape="circle"
                            aria-pressed={option.slug === selectedSlug}
                            disabled={disabled}
                            title={disabled ? `${option.name} (unavailable)` : option.name}
                            onClick={() => onSelect(option.slug)}
                        >
                            {option.name}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
