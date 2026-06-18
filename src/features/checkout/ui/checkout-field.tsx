import { cn } from "@/shared/lib/utils";

type CheckoutFieldProps = {
    label: string;
    htmlFor: string;
    error?: string;
    optional?: boolean;
    children: React.ReactNode;
    className?: string;
};

export function CheckoutField({ label, htmlFor, error, optional, children, className }: CheckoutFieldProps) {
    const errorId = `${htmlFor}-error`;

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <label htmlFor={htmlFor} className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 tracking-wide">{label}</span>
                {optional && <span className="text-xs text-gray-400">Optional</span>}
            </label>
            {children}
            {error && (
                <p id={errorId} role="alert" className="text-xs text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}
