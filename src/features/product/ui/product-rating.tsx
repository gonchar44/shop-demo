import { StarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type ProductRatingProps = {
    rating: number | null;
    reviewCount: number;
};

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
    if (rating === null) return null;

    const filledStars = Math.round(rating);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                        key={index}
                        className={cn("size-4", index < filledStars ? "text-gray-950" : "text-gray-200")}
                        fill="currentColor"
                        strokeWidth={0}
                    />
                ))}
            </div>
            <span className="text-sm font-semibold text-gray-950">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
        </div>
    );
}
