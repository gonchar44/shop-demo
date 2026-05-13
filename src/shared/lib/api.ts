export class ApiError extends Error {
    constructor(
        public readonly status: number,
        message: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(path, init);

    if (!res.ok) {
        const message = await readErrorMessage(res);
        throw new ApiError(res.status, message);
    }

    if (res.status === 204) {
        return undefined as T;
    }

    const text = await res.text();

    if (!text) {
        return undefined as T;
    }

    return JSON.parse(text) as T;
}

async function readErrorMessage(res: Response) {
    const text = await res.text().catch(() => "");

    if (!text) {
        return res.statusText;
    }

    try {
        const parsed = JSON.parse(text) as { error?: unknown; message?: unknown };
        const message = parsed.message ?? parsed.error;

        if (typeof message === "string") {
            return message;
        }

        if (message) {
            return JSON.stringify(message);
        }
    } catch {
        return text;
    }

    return text;
}

export function apiGet<T>(path: string): Promise<T> {
    return apiFetch<T>(path);
}

export function apiMutate<T>(path: string, method: "POST" | "PUT" | "PATCH" | "DELETE", body?: unknown): Promise<T> {
    return apiFetch<T>(path, {
        method,
        headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });
}
