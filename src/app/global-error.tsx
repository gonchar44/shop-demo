"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ErrorView } from "@/features/error/ui/error-view";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

type GlobalErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <div className="max-w-7xl w-full mx-auto px-6 flex-1 flex flex-col">
                    <ErrorView error={error} reset={reset} />
                </div>
            </body>
        </html>
    );
}
