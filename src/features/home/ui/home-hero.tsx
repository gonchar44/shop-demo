import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

// TODO: It's temporary content. Replace it with real content.
export function HomeHero() {
    return (
        <main className="flex-1 flex flex-col justify-center bg-white p-6">
            {/* Top rule */}
            <div
                className="border-t border-gray-200 mb-12"
                style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0ms" }}
            />

            {/* Content cluster */}
            <div className="flex flex-col gap-6">
                {/* Label */}
                <p
                    className="text-xs font-medium tracking-widest text-gray-400 uppercase"
                    style={{ animation: "fadeUp 0.7s ease both", animationDelay: "80ms" }}
                >
                    Shop Demo
                </p>

                {/* Display headline */}
                <h1
                    className="font-mono font-bold leading-none tracking-tight text-gray-950"
                    style={{
                        fontSize: "clamp(3rem, 8vw, 7rem)",
                        animation: "fadeUp 0.7s ease both",
                        animationDelay: "160ms",
                    }}
                >
                    Coming
                    <br />
                    Soon
                </h1>

                {/* Tagline */}
                <p
                    className="text-sm text-gray-500 leading-relaxed max-w-xs"
                    style={{ animation: "fadeUp 0.7s ease both", animationDelay: "240ms" }}
                >
                    A new shopping experience is on its way.
                    <br />
                    For now, explore what&apos;s already here.
                </p>

                {/* CTA */}
                <Link
                    href="/catalog"
                    className="group inline-flex items-center gap-2 w-fit px-6 py-3 bg-gray-950 text-white text-sm font-bold rounded-2xl transition-colors duration-200 hover:bg-gray-800"
                    style={{ animation: "fadeUp 0.7s ease both", animationDelay: "320ms" }}
                >
                    Browse the Catalog
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        <ArrowRightIcon className="size-5" />
                    </span>
                </Link>
            </div>

            {/* Bottom rule */}
            <div
                className="border-t border-gray-200 mt-12"
                style={{ animation: "fadeUp 0.6s ease both", animationDelay: "400ms" }}
            />

            <style>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    );
}
