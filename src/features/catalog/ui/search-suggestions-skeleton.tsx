import { Skeleton } from "@/shared/ui/skeleton";

export function SearchSuggestionsSkeleton() {
    return (
        <div className="p-3 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 px-1 py-0.5">
                    <Skeleton className="size-14 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-3.5 w-3/4" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
