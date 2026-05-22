import * as React from "react";
import { cn } from "@/shared/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
    return (
        <input
            ref={ref}
            {...props}
            className={cn(
                "w-full h-12 px-4",
                "bg-gray-100 rounded-2xl",
                "text-sm text-gray-950 placeholder:text-gray-400",
                "border border-transparent outline-none",
                "transition-all duration-150",
                "focus:bg-white focus:border-gray-950",
                className,
            )}
        />
    );
});
