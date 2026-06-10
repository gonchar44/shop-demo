"use client";

import { ErrorView } from "@/features/error/ui/error-view";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
    unstable_retry?: () => void;
};

export default function Error({ error, reset, unstable_retry }: ErrorProps) {
    return <ErrorView error={error} reset={reset} unstable_retry={unstable_retry} />;
}
