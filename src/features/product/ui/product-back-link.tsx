import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProductBackLink() {
    return (
        <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-950"
        >
            <ArrowLeft className="size-4" />
            Back to catalog
        </Link>
    );
}
