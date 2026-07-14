import * as RadioGroup from "@radix-ui/react-radio-group";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import { cn } from "@/shared/lib/utils";

type ProductGalleryThumbItemProps = {
    image: string;
    index: number;
    total: number;
    name: string;
    className?: string;
};

export function ProductGalleryThumbItem({ image, index, total, name, className }: ProductGalleryThumbItemProps) {
    return (
        <RadioGroup.Item
            value={String(index)}
            aria-label={`View image ${index + 1} of ${total}`}
            className={cn(
                "cursor-pointer relative size-20 shrink-0 overflow-hidden rounded-lg bg-gray-50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-1",
                "data-[state=checked]:border-2",
                className,
            )}
        >
            <ImageWithFallback
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="rounded-lg size-full object-contain p-1.5"
                iconClassName="size-6"
            />
        </RadioGroup.Item>
    );
}
