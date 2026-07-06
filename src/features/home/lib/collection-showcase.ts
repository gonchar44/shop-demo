export type CollectionShowcaseItem = {
    slug: string;
    image: string;
    description: string;
};

export const COLLECTION_SHOWCASE_ITEMS: CollectionShowcaseItem[] = [
    {
        slug: "studio-desk",
        image: "/images/collections/studio-desk.webp",
        description: "Clean lines and warm brass for the hours that ask for focus.",
    },
    {
        slug: "evening-rituals",
        image: "/images/collections/evening-rituals.webp",
        description: "Low light, soft wax, and the slow wind-down of a long day.",
    },
    {
        slug: "small-space-living",
        image: "/images/collections/small-space-living.webp",
        description: "Considered pieces that give a compact room to breathe.",
    },
];
