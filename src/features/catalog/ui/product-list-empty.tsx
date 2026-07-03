"use client";

import { WifiOffIcon, SearchXIcon, PackageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";
import { Button } from "@/shared/ui/button";

type Variant = "error" | "no-results" | "empty-catalog";

type ProductListEmptyProps = {
    variant: Variant;
    onRetry?: () => void;
    onClearSearch?: () => void;
};

type VariantConfig = {
    Icon: LucideIcon;
    heading: string;
    subtext: string;
};

const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
    error: {
        Icon: WifiOffIcon,
        heading: "Something went wrong",
        subtext: "We couldn't load the products. Please try again.",
    },
    "no-results": {
        Icon: SearchXIcon,
        heading: "No products found",
        subtext: "Try different keywords or adjust your filters.",
    },
    "empty-catalog": {
        Icon: PackageIcon,
        heading: "No products here yet",
        subtext: "Check back soon — more products are on the way.",
    },
};

export function ProductListEmpty({ variant, onRetry, onClearSearch }: ProductListEmptyProps) {
    const { Icon, heading, subtext } = VARIANT_CONFIG[variant];

    function resolveAction() {
        if (variant === "error" && onRetry)
            return (
                <Button type="button" onClick={onRetry}>
                    Try again
                </Button>
            );
        if (variant === "no-results" && onClearSearch)
            return (
                <Button type="button" onClick={onClearSearch}>
                    Clear filters
                </Button>
            );
    }

    return <EmptyState icon={<Icon />} heading={heading} subtext={subtext} action={resolveAction()} />;
}
