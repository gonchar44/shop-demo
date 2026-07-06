import { CollectionsSection } from "@/features/home/ui/sections/collections-section";
import { FeaturedPicksSection } from "@/features/home/ui/sections/featured-picks-section";
import { HeroSection } from "@/features/home/ui/sections/hero-section";
import { RoomsSection } from "@/features/home/ui/sections/rooms-section";

export function HomeSections() {
    return (
        <main className="flex-1 flex flex-col bg-white">
            <HeroSection />
            <RoomsSection />
            <FeaturedPicksSection />
            <CollectionsSection />
        </main>
    );
}
