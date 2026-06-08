import { Skeleton } from "@/shared/ui/skeleton";

export function WishlistPopoverItemSkeleton() {
    return (
        <li className="grid items-center gap-3.5 px-4 py-3.5 grid-cols-[auto_1fr_auto]">
            <Skeleton className="w-18 h-22 rounded-xl" />
            <div className="flex flex-col gap-2 pt-1">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="flex items-center gap-1.5">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="size-8 rounded-full" />
            </div>
        </li>
    );
}
