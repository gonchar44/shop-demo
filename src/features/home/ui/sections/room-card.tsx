import Link from "next/link";
import Image from "next/image";

type RoomCardProps = {
    slug: string;
    name: string;
    productCount: number;
    image: string;
};

export function RoomCard({ slug, name, productCount, image }: RoomCardProps) {
    return (
        <Link href={`/catalog?room=${slug}`} className="group relative block aspect-video overflow-hidden rounded-2xl">
            <Image
                src={image}
                alt={name}
                fill={true}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="mt-1 text-xs font-medium tracking-widest text-white/70 uppercase">
                    {productCount} {productCount === 1 ? "Piece" : "Pieces"}
                </p>
            </div>
        </Link>
    );
}
