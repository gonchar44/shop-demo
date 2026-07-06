import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

type CollectionCardProps = {
    slug: string;
    name: string;
    description: string;
    image: string;
    index: number;
};

export function CollectionCard({ slug, name, description, image, index }: CollectionCardProps) {
    return (
        <Link href={`/catalog?collection=${slug}`} className="group block">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    src={image}
                    alt={name}
                    fill={true}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium tracking-widest text-white uppercase backdrop-blur-sm">
                    {`Collection · 0${index + 1}`}
                </span>
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-950">{name}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-950 transition-colors duration-200 group-hover:text-gray-600">
                Explore collection
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    <ArrowRightIcon className="size-4" />
                </span>
            </span>
        </Link>
    );
}
