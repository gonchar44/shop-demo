import { BrandStatementSection } from "@/features/home/ui/sections/brand-statement-section";
import { CollectionsSection } from "@/features/home/ui/sections/collections-section";
import { FeaturedPicksSection } from "@/features/home/ui/sections/featured-picks-section";
import { HeroSection } from "@/features/home/ui/sections/hero-section";
import { NewArrivalsSection } from "@/features/home/ui/sections/new-arrivals-section";
import { RoomsSection } from "@/features/home/ui/sections/rooms-section";

export function HomeSections() {
    return (
        <main className="flex-1 flex flex-col bg-white">
            <HeroSection />
            <RoomsSection />
            <FeaturedPicksSection />
            <CollectionsSection />
            <NewArrivalsSection />
            <BrandStatementSection />
        </main>
    );
}
