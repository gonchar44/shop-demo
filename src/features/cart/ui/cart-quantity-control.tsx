"use client";

import { type MouseEvent, type ReactNode } from "react";
import { HandbagIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { showToast } from "@/shared/lib/toast";
import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useAddToCart } from "@/features/cart/lib/use-add-to-cart";
import { cn } from "@/shared/lib/utils";

type CartQuantityControlProps = {
    variantId: string;
    productId: string;
    stock: number;
    variant?: "card" | "popover";
    className?: string;
};

const MotionButton = motion.create(Button);

export function CartQuantityControl({
    variantId,
    productId,
    stock,
    variant = "card",
    className,
}: CartQuantityControlProps) {
    const reduceMotion = useReducedMotion();

    const { quantity, isInCart, isOutOfStock, isAtStockLimit, handleAdd, handleIncrement } = useAddToCart(
        variantId,
        productId,
        stock,
    );
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeFromCart = useCartStore((s) => s.removeFromCart);

    const isPopoverVariant = variant === "popover";

    const isKeyboard = (event: MouseEvent) => event.detail === 0;
    const releasePointerFocus = (event: MouseEvent<HTMLButtonElement>) => {
        if (!isKeyboard(event)) event.currentTarget.blur();
    };

    function onIncrementClick(event: MouseEvent<HTMLButtonElement>) {
        handleIncrement();
        releasePointerFocus(event);
    }

    function handleDecrement(event: MouseEvent<HTMLButtonElement>) {
        if (quantity <= 1) {
            releasePointerFocus(event);
            removeFromCart(variantId);
            showToast.custom("Removed from cart", {
                icon: <ShoppingCartIcon className="size-4" />,
            });
            return;
        }
        updateQuantity(variantId, quantity - 1, stock);
        releasePointerFocus(event);
    }

    if (isPopoverVariant && !isInCart) return null;

    return (
        <motion.div
            layout="size"
            transition={reduceMotion ? { duration: 0 } : { layout: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
            className={cn(
                "inline-flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-gray-950",
                "transition-[width] duration-200 ease-out motion-reduce:transition-none",
                isPopoverVariant ? "w-24 border border-gray-200" : "w-9",
                !isPopoverVariant &&
                    isInCart &&
                    "pointer-coarse:w-24 pointer-fine:group-hover:w-24 pointer-fine:group-focus-within:w-24",
                className,
            )}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isInCart ? (
                    <motion.div
                        key="stepper"
                        role="group"
                        aria-label={`Quantity in cart: ${quantity}`}
                        className="flex items-center px-1"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.12 }}
                    >
                        <StepButton
                            onClick={handleDecrement}
                            label={quantity <= 1 ? "Remove from cart" : "Decrease quantity"}
                            isAlwaysVisible={isPopoverVariant}
                        >
                            <MinusIcon className="size-3.5" strokeWidth={2} />
                        </StepButton>

                        <motion.span
                            key={quantity}
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.15 }}
                            className="w-7 text-center text-sm font-bold tabular-nums"
                        >
                            {quantity}
                        </motion.span>

                        <StepButton
                            onClick={onIncrementClick}
                            disabled={isAtStockLimit}
                            label="Increase quantity"
                            isAlwaysVisible={isPopoverVariant}
                        >
                            <PlusIcon className="size-3.5" strokeWidth={2} />
                        </StepButton>
                    </motion.div>
                ) : (
                    <MotionButton
                        key="add"
                        type="button"
                        variant="ghost"
                        size="icon-md"
                        shape="circle"
                        onClick={handleAdd}
                        disabled={isOutOfStock}
                        aria-label={isOutOfStock ? "Out of stock" : "Add to cart"}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        whileTap={reduceMotion || isOutOfStock ? undefined : { scale: 0.9 }}
                        className={cn(
                            "h-9 w-9 hover:scale-100 active:scale-100",
                            "transition-colors duration-150 hover:bg-gray-100",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                            "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
                            "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
                        )}
                    >
                        <HandbagIcon className="size-5" strokeWidth={1.7} />
                    </MotionButton>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

type StepButtonProps = {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    label: string;
    disabled?: boolean;
    isAlwaysVisible?: boolean;
    children: ReactNode;
};

function StepButton({ onClick, label, disabled, isAlwaysVisible = false, children }: StepButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            shape="circle"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={cn(
                "h-7 shrink-0 overflow-hidden hover:scale-100 active:scale-90",
                "text-gray-500 transition-all duration-200 ease-out motion-reduce:transition-none",
                "hover:bg-gray-100 hover:text-gray-950",
                isAlwaysVisible
                    ? "w-7 opacity-100"
                    : "w-0 opacity-0 pointer-coarse:w-7 pointer-coarse:opacity-100 pointer-fine:group-hover:w-7 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-within:w-7 pointer-fine:group-focus-within:opacity-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-950",
                "disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent",
                "disabled:hover:text-gray-300 disabled:active:scale-100",
            )}
        >
            {children}
        </Button>
    );
}
