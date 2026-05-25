import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
    [
        "inline-flex items-center justify-center",
        "font-semibold cursor-pointer select-none",
        "transition-all duration-150",
        "active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:active:scale-100",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-gray-950 text-white",
                    "hover:bg-gray-800",
                    "focus-visible:ring-gray-950",
                    "disabled:opacity-50 disabled:hover:bg-gray-950",
                ],
                secondary: [
                    "bg-gray-100 text-gray-950",
                    "hover:bg-gray-950 hover:text-white",
                    "focus-visible:ring-gray-950",
                    "disabled:opacity-35 disabled:hover:bg-gray-100 disabled:hover:text-gray-950",
                ],
                ghost: [
                    "bg-transparent text-gray-950",
                    "hover:bg-gray-100",
                    "focus-visible:ring-gray-950",
                    "disabled:opacity-50 disabled:hover:bg-transparent",
                ],
                "ghost-circle": [
                    "bg-white/80 backdrop-blur-sm text-gray-700",
                    "hover:bg-white",
                    "focus-visible:ring-gray-950",
                    "disabled:opacity-50 disabled:hover:bg-white/80",
                ],
            },
            size: {
                sm: "h-9 gap-1.5 px-4 text-xs rounded-2xl",
                md: "h-11 gap-2 px-6 text-sm rounded-2xl",
                lg: "h-14 gap-2.5 px-8 text-base rounded-2xl",
                "icon-sm": "w-8 h-8",
                "icon-md": "w-9 h-9",
                "icon-lg": "w-10 h-10",
            },
            shape: {
                default: "",
                circle: "rounded-full",
                square: "rounded-xl",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            shape: "default",
        },
    },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, shape, ...props }: ButtonProps) {
    return <button type="button" {...props} className={cn(buttonVariants({ variant, size, shape }), className)} />;
}

export { buttonVariants };
