import { getCollectionsBySlugs } from "@/features/catalog/server/product.queries";
import { COLLECTION_SHOWCASE_ITEMS } from "@/features/home/lib/collection-showcase";
import { SectionHeader } from "@/features/home/ui/section-header";
import { CollectionCard } from "@/features/home/ui/sections/collection-card";

export async function CollectionsSection() {
    const slugs = COLLECTION_SHOWCASE_ITEMS.map((item) => item.slug);
    const collections = await getCollectionsBySlugs(slugs);
    const collectionBySlug = new Map(collections.map((collection) => [collection.slug, collection]));

    const items = COLLECTION_SHOWCASE_ITEMS.map((item) => {
        const collection = collectionBySlug.get(item.slug);
        return collection ? { ...item, name: collection.name } : null;
    }).filter((item) => item !== null);

    if (items.length === 0) return null;

    return (
        <section className="rounded-3xl bg-gray-100 px-6 py-10 md:px-10 md:py-12">
            <SectionHeader eyebrow="Curated Collections" heading="Stories for the home" />
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
                {items.map((item, index) => (
                    <CollectionCard
                        key={item.slug}
                        slug={item.slug}
                        name={item.name}
                        description={item.description}
                        image={item.image}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
