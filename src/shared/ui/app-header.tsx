import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { WishlistControl } from "@/features/wishlist/ui/wishlist-control";
import { CartControl } from "@/features/cart/ui/cart-control";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/70">
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                <Link
                    href="/"
                    aria-label="Go to home"
                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 rounded-sm"
                >
                    <ShoppingBagIcon className="size-5" />
                    <span className="font-mono text-xs tracking-widest font-semibold text-gray-950">SHOP DEMO</span>
                </Link>

                <div className="flex items-center gap-1">
                    <WishlistControl />
                    <CartControl />
                </div>
            </div>
        </header>
    );
}
