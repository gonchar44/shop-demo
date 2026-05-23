import * as React from "react";
import { cn } from "@/shared/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
    return <span {...props} className={cn("px-3 py-1 rounded-full text-xs font-semibold", className)} />;
}
