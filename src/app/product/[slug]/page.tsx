import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/catalog/server/product.queries";
import { ProductInfoPanel } from "@/features/product/ui/product-info-panel";
import { ProductGallery } from "@/features/product/ui/product-gallery";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return { title: "Product not found" };

    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) notFound();

    const images = product.images.length > 0 ? product.images : [product.thumbnail];

    return (
        <main className="flex-1 bg-white py-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <ProductGallery images={images} name={product.name} />
                <ProductInfoPanel product={product} />
            </div>
        </main>
    );
}
