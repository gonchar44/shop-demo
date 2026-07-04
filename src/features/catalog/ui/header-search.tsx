"use client";

import { useRef, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/shared/ui/button";
import { ProductSearch } from "@/features/catalog/ui/product-search";
import { useClickOutside } from "@/shared/lib/use-click-outside";

export function HeaderSearch() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

    useClickOutside(mobileSearchContainerRef, () => {
        setIsMobileOpen(false);
    });

    return (
        <>
            <div className="hidden md:block w-full max-w-md">
                <ProductSearch className="w-full" />
            </div>

            <Button
                type="button"
                variant="secondary"
                size="md"
                shape="circle"
                aria-label="Open search"
                className="md:hidden"
                onClick={() => setIsMobileOpen(true)}
            >
                <SearchIcon className="size-5" strokeWidth={1.6} />
                Search
            </Button>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        ref={mobileSearchContainerRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setIsMobileOpen(false);
                        }}
                        className="md:hidden absolute px-6 inset-0 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-lg"
                    >
                        <ProductSearch className="w-full" autoFocus={true} />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-md"
                            shape="circle"
                            aria-label="Close search"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <XIcon className="size-5" strokeWidth={1.6} />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
