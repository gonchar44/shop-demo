import { FeaturedPicksSection } from "@/features/home/ui/sections/featured-picks-section";
import { HeroSection } from "@/features/home/ui/sections/hero-section";

export function HomeSections() {
    return (
        <main className="flex-1 flex flex-col bg-white">
            <HeroSection />
            <FeaturedPicksSection />
        </main>
    );
}
