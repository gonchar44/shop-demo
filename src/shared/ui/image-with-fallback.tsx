"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type ImageWithFallbackProps = {
    src: string | null | undefined;
    alt: string;
    width: number;
    height: number;
    sizes?: string;
    loading?: "eager" | "lazy";
    className?: string;
    iconClassName?: string;
    label?: string;
};

export function ImageWithFallback({
    src,
    alt,
    width,
    height,
    sizes,
    loading,
    className,
    iconClassName,
    label,
}: ImageWithFallbackProps) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div className="flex flex-col items-center justify-center gap-1">
                <ImageIcon className={cn("text-gray-300", iconClassName)} strokeWidth={1.5} />
                {label && <span className="text-xs text-gray-300">{label}</span>}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={loading}
            className={className}
            onError={() => setFailed(true)}
        />
    );
}
