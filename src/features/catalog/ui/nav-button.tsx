"use client";

type NavButtonProps = {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    "aria-label": string;
};

export function NavButton({ onClick, disabled, children, "aria-label": ariaLabel }: NavButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-950 transition-all duration-150 hover:bg-gray-950 hover:text-white active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-1 cursor-pointer"
        >
            {children}
        </button>
    );
}
