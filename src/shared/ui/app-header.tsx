import { HandbagIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { WishlistControl } from "@/features/wishlist/ui/wishlist-control";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/70">
            <div className="max-w-7xl mx-auto px-9 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <ShoppingBagIcon className="size-5" />
                    <span className="font-mono text-xs tracking-widest font-semibold text-gray-950">SHOP DEMO</span>
                </div>

                <div className="flex items-center gap-1">
                    <WishlistControl />
                    <Button
                        disabled
                        variant="ghost"
                        size="icon-md"
                        shape="circle"
                        aria-label="Cart"
                        className="relative"
                    >
                        <HandbagIcon className="size-5" strokeWidth={1.6} />
                    </Button>
                </div>
            </div>
        </header>
    );
}
