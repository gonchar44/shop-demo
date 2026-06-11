import { type RefObject, useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void): void {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        function handleMouseDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callbackRef.current();
            }
        }
        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [ref]);
}
