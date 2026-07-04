import Link from "next/link";
import { Suspense } from "react";
import { ShoppingBagIcon } from "lucide-react";
import { WishlistControl } from "@/features/wishlist/ui/wishlist-control";
import { CartControl } from "@/features/cart/ui/cart-control";
import { HeaderSearch } from "@/features/catalog/ui/header-search";
import { Skeleton } from "@/shared/ui/skeleton";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/70">
            <div className="relative max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-4">
                <Link
                    href="/"
                    aria-label="Go to home"
                    className="shrink-0 flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 rounded-sm"
                >
                    <ShoppingBagIcon className="size-5" />
                    <span className="font-mono text-xs tracking-widest font-semibold text-gray-950">SHOP DEMO</span>
                </Link>

                <div className="flex-1 min-w-0 flex justify-center">
                    <Suspense
                        fallback={
                            <>
                                <Skeleton className="hidden md:block h-12 w-full max-w-md rounded-2xl" />
                                <Skeleton className="md:hidden size-9 rounded-full" />
                            </>
                        }
                    >
                        <HeaderSearch />
                    </Suspense>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                    <WishlistControl />
                    <CartControl />
                </div>
            </div>
        </header>
    );
}
