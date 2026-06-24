"use client";

import { ChipIcon } from "@/features/checkout/ui/chip-icon";
import { CardBrandLogo } from "@/features/checkout/ui/card-brand-logo";
import { formatCardDisplay } from "@/features/checkout/lib/card-format";

type CheckoutCardVisualProps = {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    isFlipped: boolean;
};

const noiseDataUri =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E";

export function CheckoutCardVisual({ cardNumber, cardholderName, expiry, isFlipped }: CheckoutCardVisualProps) {
    return (
        <div className="w-full" style={{ perspective: "1000px" }}>
            <div
                className="relative w-full"
                style={{
                    aspectRatio: "1.586 / 1",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
                    <div className="absolute inset-0 bg-gray-950" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700/25 via-transparent to-gray-900/40" />
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{ backgroundImage: `url("${noiseDataUri}")`, backgroundSize: "200px 200px" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/5 to-transparent" />

                    <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
                        <div className="flex items-start justify-between">
                            <ChipIcon />
                            <CardBrandLogo cardNumber={cardNumber} />
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="font-mono text-white/90 text-lg tracking-widest leading-none select-none">
                                {formatCardDisplay(cardNumber)}
                            </p>

                            <div className="flex items-end justify-between">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-white/40 text-xs font-medium tracking-widest uppercase">
                                        Card Holder
                                    </span>
                                    <span className="text-white/80 text-sm font-medium tracking-wider uppercase truncate max-w-40">
                                        {cardholderName || "FULL NAME"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-0.5 items-end">
                                    <span className="text-white/40 text-xs font-medium tracking-widest uppercase">
                                        Expires
                                    </span>
                                    <span className="font-mono text-white/80 text-sm tracking-wider">
                                        {expiry || "MM/YY"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="absolute inset-0 bg-gray-950" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 via-transparent to-gray-900/40" />
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{ backgroundImage: `url("${noiseDataUri}")`, backgroundSize: "200px 200px" }}
                    />

                    <div className="relative h-full flex flex-col pt-5">
                        <div className="w-full h-10 bg-gray-800/90" />

                        <div className="flex flex-col gap-2 px-5 sm:px-6 mt-4">
                            <span className="text-white/40 text-xs font-medium tracking-widest uppercase">
                                Security Code
                            </span>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-9 bg-white/90 rounded flex items-center px-3">
                                    <div className="flex-1 h-px bg-gray-400/60" />
                                </div>
                                <div className="w-12 h-9 bg-white/90 rounded flex items-center justify-center">
                                    <span className="font-mono text-gray-700 text-sm font-medium tracking-widest">
                                        •••
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end px-5 sm:px-6 mt-auto mb-4">
                            <CardBrandLogo cardNumber={cardNumber} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
