export function formatCardDisplay(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const groups = [];
    for (let index = 0; index < 4; index++) {
        const chunk = digits.slice(index * 4, index * 4 + 4);
        if (index < 3) {
            groups.push(chunk ? "•".repeat(chunk.length).padEnd(4, "•") : "••••");
        } else {
            groups.push(chunk.padEnd(4, "•"));
        }
    }
    return groups.join("  ");
}
