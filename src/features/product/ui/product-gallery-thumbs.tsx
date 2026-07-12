import { ProductGalleryThumbsRail } from "@/features/product/ui/product-gallery-thumbs-rail";
import { ProductGalleryThumbsStrip } from "@/features/product/ui/product-gallery-thumbs-strip";

type ProductGalleryThumbsProps = {
    images: string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    name: string;
};

export function ProductGalleryThumbs({ images, selectedIndex, onSelect, name }: ProductGalleryThumbsProps) {
    return (
        <div className="order-2 w-full sm:order-first sm:w-auto">
            <ProductGalleryThumbsRail images={images} selectedIndex={selectedIndex} onSelect={onSelect} name={name} />
            <ProductGalleryThumbsStrip images={images} selectedIndex={selectedIndex} onSelect={onSelect} name={name} />
        </div>
    );
}
