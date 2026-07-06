import type { Metadata } from "next";
import { HomeSections } from "@/features/home/ui/home-sections";

export const metadata: Metadata = {
    description: "Welcome to Shop Demo — browse our curated product catalog.",
};

export default function Home() {
    return <HomeSections />;
}
