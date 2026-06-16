import type { Metadata } from "next";
import { HomeHero } from "@/features/home/ui/home-hero";

export const metadata: Metadata = {
    description: "Welcome to Shop Demo — browse our curated product catalog.",
};

export default function Home() {
    return <HomeHero />;
}
