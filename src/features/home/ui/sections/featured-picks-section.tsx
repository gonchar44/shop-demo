import { getFeaturedProducts } from "@/features/catalog/server/product.queries";
import { ProductCard } from "@/features/catalog/ui/product-card";
import { SectionHeader } from "@/features/home/ui/section-header";

const FEATURED_PICKS_LIMIT = 5;

export async function FeaturedPicksSection() {
    const products = await getFeaturedProducts(FEATURED_PICKS_LIMIT);

    if (products.length === 0) return null;

    return (
        <section className="py-6">
            <SectionHeader
                eyebrow="Editor's Selection"
                heading="Featured picks"
                action={{ label: "View all products", href: "/catalog?featured=1" }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 mt-8">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </section>
    );
}
