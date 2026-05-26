"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon } from "lucide-react";
import type { ProductListResponse } from "@/features/catalog/model/product.types";
import { Button } from "@/shared/ui/button";

type Pagination = ProductListResponse["pagination"];

type ProductPaginationProps = {
    pagination: Pagination;
};

export function ProductPagination({ pagination }: ProductPaginationProps) {
    const { page, totalPages, hasNext, hasPrev } = pagination;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function navigate(targetPage: number) {
        const next = new URLSearchParams(searchParams.toString());
        next.set("page", String(targetPage));
        router.push(`${pathname}?${next.toString()}`);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <Button
                variant="secondary"
                size="icon-lg"
                shape="square"
                onClick={() => navigate(1)}
                disabled={!hasPrev}
                aria-label="First page"
            >
                <ChevronsLeftIcon className="size-5" strokeWidth={2} />
            </Button>

            <Button
                variant="secondary"
                size="icon-lg"
                shape="square"
                onClick={() => navigate(page - 1)}
                disabled={!hasPrev}
                aria-label="Previous page"
            >
                <ChevronLeftIcon className="size-5" strokeWidth={2} />
            </Button>

            <span className="px-4 text-sm font-medium text-gray-500 tabular-nums select-none">
                {page} / {totalPages}
            </span>

            <Button
                variant="secondary"
                size="icon-lg"
                shape="square"
                onClick={() => navigate(page + 1)}
                disabled={!hasNext}
                aria-label="Next page"
            >
                <ChevronRightIcon className="size-5" strokeWidth={2} />
            </Button>

            <Button
                variant="secondary"
                size="icon-lg"
                shape="square"
                onClick={() => navigate(totalPages)}
                disabled={!hasNext}
                aria-label="Last page"
            >
                <ChevronsRightIcon className="size-5" strokeWidth={2} />
            </Button>
        </div>
    );
}
