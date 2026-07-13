"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRightIcon, HandbagIcon } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/utils";
import type { ProductListItem } from "@/features/catalog/model/product.types";
import { BADGE_STYLES, resolveBadge } from "@/features/catalog/lib/product-badge";
import { ProductGallery } from "@/features/product/ui/product-gallery";
import { ProductPurchasePanel } from "@/features/product/ui/product-purchase-panel";

type ProductQuickAddDialogProps = {
    product: ProductListItem;
    triggerClassName?: string;
};

export function ProductQuickAddDialog({ product, triggerClassName }: ProductQuickAddDialogProps) {
    const badge = resolveBadge(product);

    const galleryImages = useMemo(() => {
        const candidates = [product.thumbnail, ...product.variants.map((variant) => variant.image)];
        return Array.from(new Set(candidates.filter((src): src is string => Boolean(src))));
    }, [product]);

    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-md"
                    shape="circle"
                    aria-label="Choose options"
                    title="Choose options"
                    className={triggerClassName}
                >
                    <HandbagIcon className="size-5" strokeWidth={1.7} />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-dvh w-11/12 max-w-3xl flex-col overflow-hidden p-0 lg:max-w-4xl">
                <div className="min-h-0 flex-1 overflow-y-auto p-6">
                    <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription className="sr-only">
                            Choose a color and material for {product.name}, then add it to your cart.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <ProductGallery images={galleryImages} name={product.name} />

                        <div className="flex flex-col gap-4">
                            {badge && <Badge className={cn("w-fit", BADGE_STYLES[badge.variant])}>{badge.label}</Badge>}
                            <Link
                                href={`/product/${product.slug}`}
                                className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-gray-950 transition-colors duration-200 hover:text-gray-600"
                            >
                                View full details
                                <span
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden="true"
                                >
                                    <ArrowRightIcon className="size-4" />
                                </span>
                            </Link>
                            <ProductPurchasePanel product={product} showSpecs={false} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
