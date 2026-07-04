import { getHeroProduct } from "@/features/catalog/server/product.queries";
import { HeroCopy } from "@/features/home/ui/sections/hero-copy";
import { HeroProductShowcase } from "@/features/home/ui/sections/hero-product-showcase";

export async function HeroSection() {
    const product = await getHeroProduct();

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-center py-10 md:py-16">
            <HeroCopy />
            {product && <HeroProductShowcase product={product} />}
        </section>
    );
}
