import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { BADGE_STYLES, resolveBadge } from "@/features/catalog/lib/product-badge";
import { ProductHeader } from "@/features/product/ui/product-header";
import { ProductRating } from "@/features/product/ui/product-rating";
import { ProductPurchasePanel } from "@/features/product/ui/product-purchase-panel";

type ProductInfoPanelProps = {
    product: ProductListItem;
};

export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
    const badge = resolveBadge(product);
    const tags = [product.room, product.style].filter((tag) => tag !== null);

    return (
        <div className="flex flex-col gap-5">
            <ProductHeader productId={product.id} category={product.category} collection={product.collection} />

            {badge && <Badge className={cn("w-fit", BADGE_STYLES[badge.variant])}>{badge.label}</Badge>}

            <h1 className="text-4xl font-bold text-gray-950">{product.name}</h1>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag.id} className="bg-gray-100 text-gray-600 uppercase tracking-wide font-mono">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            )}

            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

            <ProductRating rating={product.rating} reviewCount={product.reviewCount} />

            <ProductPurchasePanel product={product} />
        </div>
    );
}
