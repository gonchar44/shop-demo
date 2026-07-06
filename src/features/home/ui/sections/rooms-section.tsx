import { getRoomsWithProductCount } from "@/features/catalog/server/product.queries";
import { ROOM_SHOWCASE_ITEMS } from "@/features/home/lib/room-showcase";
import { SectionHeader } from "@/features/home/ui/section-header";
import { RoomCard } from "@/features/home/ui/sections/room-card";

export async function RoomsSection() {
    const slugs = ROOM_SHOWCASE_ITEMS.map((item) => item.slug);
    const rooms = await getRoomsWithProductCount(slugs);
    const roomBySlug = new Map(rooms.map((room) => [room.slug, room]));

    const items = ROOM_SHOWCASE_ITEMS.map((item) => {
        const room = roomBySlug.get(item.slug);
        return room ? { ...item, name: room.name, productCount: room.productCount } : null;
    }).filter((item) => item !== null);

    if (items.length === 0) return null;

    return (
        <section className="py-6">
            <SectionHeader eyebrow="Shop by Room" heading="Where it lives" />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {items.map((item) => (
                    <RoomCard
                        key={item.slug}
                        slug={item.slug}
                        name={item.name}
                        productCount={item.productCount}
                        image={item.image}
                    />
                ))}
            </div>
        </section>
    );
}
