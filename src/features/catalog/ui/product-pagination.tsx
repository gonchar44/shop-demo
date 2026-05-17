"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon } from "lucide-react";
import type { ProductListResponse } from "@/features/catalog/model/product.types";
import { NavButton } from "./nav-button";

type Pagination = ProductListResponse["pagination"];

type Props = {
    pagination: Pagination;
};

export function ProductPagination({ pagination }: Props) {
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
            <NavButton onClick={() => navigate(1)} disabled={!hasPrev} aria-label="First page">
                <ChevronsLeftIcon className="size-4" strokeWidth={2} />
            </NavButton>

            <NavButton onClick={() => navigate(page - 1)} disabled={!hasPrev} aria-label="Previous page">
                <ChevronLeftIcon className="size-4" strokeWidth={2} />
            </NavButton>

            <span className="px-4 text-sm font-medium text-gray-500 tabular-nums select-none">
                {page} / {totalPages}
            </span>

            <NavButton onClick={() => navigate(page + 1)} disabled={!hasNext} aria-label="Next page">
                <ChevronRightIcon className="size-4" strokeWidth={2} />
            </NavButton>

            <NavButton onClick={() => navigate(totalPages)} disabled={!hasNext} aria-label="Last page">
                <ChevronsRightIcon className="size-4" strokeWidth={2} />
            </NavButton>
        </div>
    );
}
