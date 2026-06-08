import { Skeleton } from "@/shared/ui/skeleton";

export function CartPopoverItemSkeleton() {
    return (
        <li className="flex gap-3.5 px-4 py-3.5">
            <Skeleton className="flex-none w-18 h-22 rounded-xl" />
            <div className="flex-1 flex flex-col gap-2 pt-1">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-7 w-24 rounded-full mt-1" />
            </div>
        </li>
    );
}
