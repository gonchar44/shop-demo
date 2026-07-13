"use client";

import { useMemo, useState } from "react";
import type { ProductAttribute, ProductColor, ProductListItem } from "@/features/catalog/model/product.types";
import { formatPrice } from "@/features/catalog/lib/price";
import { findVariant, hasVariantMatching } from "@/features/product/lib/resolve-variant";
import { ProductColorPicker } from "@/features/product/ui/product-color-picker";
import { ProductMaterialPicker } from "@/features/product/ui/product-material-picker";
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button";
import { CartQuantityControl } from "@/features/cart/ui/cart-quantity-control";
import { ProductSpecs } from "@/features/product/ui/product-specs";

type ProductPurchasePanelProps = {
    product: ProductListItem;
    showSpecs?: boolean;
};

function dedupeBySlug<T extends { slug: string }>(items: T[]): T[] {
    const seen = new Set<string>();
    return items.filter((item) => {
        if (seen.has(item.slug)) return false;
        seen.add(item.slug);
        return true;
    });
}

export function ProductPurchasePanel({ product, showSpecs = true }: ProductPurchasePanelProps) {
    const { variants } = product;

    const availableColors = useMemo(
        () => dedupeBySlug(variants.map((v) => v.color).filter((color): color is ProductColor => color !== null)),
        [variants],
    );
    const availableMaterials = useMemo(
        () =>
            dedupeBySlug(
                variants.map((v) => v.material).filter((material): material is ProductAttribute => material !== null),
            ),
        [variants],
    );

    const initialVariant = useMemo(() => variants.find((v) => v.stock > 0) ?? variants[0], [variants]);

    const [selectedColorSlug, setSelectedColorSlug] = useState<string | null>(initialVariant?.color?.slug ?? null);
    const [selectedMaterialSlug, setSelectedMaterialSlug] = useState<string | null>(
        initialVariant?.material?.slug ?? null,
    );

    const selectedVariant = findVariant(variants, selectedColorSlug, selectedMaterialSlug);

    function handleSelectColor(slug: string) {
        setSelectedColorSlug(slug);
        const stillMatches = hasVariantMatching(variants, {
            colorSlug: slug,
            ...(availableMaterials.length > 0 && { materialSlug: selectedMaterialSlug }),
        });
        if (!stillMatches) {
            const fallback = variants.find((v) => v.color?.slug === slug);
            setSelectedMaterialSlug(fallback?.material?.slug ?? null);
        }
    }

    function handleSelectMaterial(slug: string) {
        setSelectedMaterialSlug(slug);
        const stillMatches = hasVariantMatching(variants, {
            ...(availableColors.length > 0 && { colorSlug: selectedColorSlug }),
            materialSlug: slug,
        });
        if (!stillMatches) {
            const fallback = variants.find((v) => v.material?.slug === slug);
            setSelectedColorSlug(fallback?.color?.slug ?? null);
        }
    }

    const priceCents = selectedVariant?.priceCents ?? product.fromPriceCents;
    const stock = selectedVariant?.stock ?? 0;
    const isOutOfStock = stock === 0;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-950">{formatPrice(priceCents, product.currency)}</span>
                {product.compareAtCents && (
                    <span className="text-lg text-gray-400 line-through">
                        {formatPrice(product.compareAtCents, product.currency)}
                    </span>
                )}
            </div>

            <ProductColorPicker
                options={availableColors}
                selectedSlug={selectedColorSlug}
                onSelect={handleSelectColor}
                isOptionDisabled={(slug) =>
                    !hasVariantMatching(variants, {
                        colorSlug: slug,
                        ...(availableMaterials.length > 0 && { materialSlug: selectedMaterialSlug }),
                    })
                }
            />

            <ProductMaterialPicker
                options={availableMaterials}
                selectedSlug={selectedMaterialSlug}
                onSelect={handleSelectMaterial}
                isOptionDisabled={(slug) =>
                    !hasVariantMatching(variants, {
                        ...(availableColors.length > 0 && { colorSlug: selectedColorSlug }),
                        materialSlug: slug,
                    })
                }
            />

            {isOutOfStock && <p className="text-sm font-medium text-gray-400">This combination is out of stock</p>}
            {!isOutOfStock && stock <= 5 && <p className="text-sm font-medium text-orange-600">Only {stock} left</p>}

            {selectedVariant ? (
                <div className="flex items-center gap-3">
                    <CartQuantityControl
                        variantId={selectedVariant.id}
                        productId={product.id}
                        stock={stock}
                        variant="popover"
                    />
                    <AddToCartButton
                        variantId={selectedVariant.id}
                        productId={product.id}
                        stock={stock}
                        className="flex-1"
                    />
                </div>
            ) : (
                <p className="text-sm font-medium text-gray-400">This product is currently unavailable</p>
            )}

            {showSpecs && (
                <ProductSpecs
                    dimensions={product.dimensions}
                    materialDetail={product.materialDetail}
                    bulbBase={product.bulbBase}
                    origin={product.origin}
                    weight={product.weight}
                />
            )}
        </div>
    );
}
