type CheckoutSectionHeaderProps = {
    number: string;
    title: string;
};

export function CheckoutSectionHeader({ number, title }: CheckoutSectionHeaderProps) {
    return (
        <div className="flex items-baseline gap-3 mb-6">
            <span className="font-mono text-xs tracking-widest text-gray-400">{number}</span>
            <h2 className="text-base font-semibold text-gray-950">{title}</h2>
        </div>
    );
}
