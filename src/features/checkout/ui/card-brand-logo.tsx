type CardBrandLogoProps = {
    cardNumber: string;
};

export function CardBrandLogo({ cardNumber }: CardBrandLogoProps) {
    const raw = cardNumber.replace(/\s/g, "");
    if (raw.startsWith("4")) {
        return (
            <span className="font-mono text-white/90 text-base font-bold italic tracking-tight">
                VISA
            </span>
        );
    }
    if (/^5[1-5]/.test(raw)) {
        return (
            <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
                <circle cx="14" cy="12" r="12" fill="#EB001B" fillOpacity="0.85" />
                <circle cx="24" cy="12" r="12" fill="#F79E1B" fillOpacity="0.85" />
                <path d="M19 4.5a12 12 0 0 1 0 15 12 12 0 0 1 0-15z" fill="#FF5F00" fillOpacity="0.7" />
            </svg>
        );
    }
    if (/^3[47]/.test(raw)) {
        return (
            <span className="font-mono text-white/90 text-xs font-bold tracking-widest">
                AMEX
            </span>
        );
    }
    return (
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <rect x="1" y="1" width="26" height="18" rx="3" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
            <rect x="5" y="8" width="18" height="1.5" rx="0.75" fill="white" fillOpacity="0.4" />
        </svg>
    );
}
