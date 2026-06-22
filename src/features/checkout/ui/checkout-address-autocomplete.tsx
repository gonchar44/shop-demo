"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useClickOutside } from "@/shared/lib/use-click-outside";
import { MapPinIcon, Loader2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CheckoutFormValues } from "@/features/checkout/model/checkout.types";
import type { GeoapifySuggestion, GeoapifyAutocompleteResponse } from "@/features/checkout/model/geoapify.types";
import { CheckoutField } from "@/features/checkout/ui/checkout-field";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

export function CheckoutAddressAutocomplete() {
    const {
        register,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useFormContext<CheckoutFormValues>();

    const { ref: addressRef } = register("address");

    const [query, setQuery] = useState(() => getValues("address") ?? "");
    const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const justSelectedRef = useRef(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchSuggestions = useCallback(async (text: string) => {
        if (text.length < 3) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/address-autocomplete?text=${encodeURIComponent(text)}`, {
                signal: controller.signal,
            });
            if (!res.ok) {
                setSuggestions([]);
                setIsOpen(false);
                return;
            }
            const data: GeoapifyAutocompleteResponse = await res.json();
            const results = data.results ?? [];
            setSuggestions(results);
            setIsOpen(results.length > 0);
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") return;
            // silent — degrades to manual input
        } finally {
            if (!controller.signal.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        // Debounce autocomplete fetches on query change. The justSelectedRef guard prevents
        // a re-fetch (and dropdown re-open) when query is set programmatically by selectSuggestion.
        if (justSelectedRef.current) {
            justSelectedRef.current = false;
            return;
        }
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            abortControllerRef.current?.abort();
        };
    }, [query, fetchSuggestions]);

    useClickOutside(wrapperRef, () => {
        setIsOpen(false);
        setActiveIndex(-1);
    });

    function selectSuggestion(s: GeoapifySuggestion) {
        const address = s.address_line1 ?? s.formatted ?? "";
        justSelectedRef.current = true;
        setQuery(address);
        setValue("address", address, { shouldValidate: true });
        setValue("city", s.city ?? s.district ?? "", { shouldValidate: true });
        setValue("postalCode", s.postcode ?? "", { shouldValidate: true });
        setValue("country", s.country ?? "", { shouldValidate: true });
        setSuggestions([]);
        setIsOpen(false);
        setActiveIndex(-1);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setQuery(val);
        setValue("address", val);
        setActiveIndex(-1);
    }

    function handleBlur() {
        trigger("address");
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!isOpen || suggestions.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            selectSuggestion(suggestions[activeIndex]);
        } else if (e.key === "Escape") {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    }

    return (
        <CheckoutField label="Address" htmlFor="address" error={errors.address?.message}>
            <div ref={wrapperRef} className="relative">
                <div className="relative">
                    <Input
                        id="address"
                        ref={addressRef}
                        value={query}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        role="combobox"
                        placeholder="123 Main Street"
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-expanded={isOpen}
                        aria-controls="address-suggestions"
                        aria-activedescendant={activeIndex >= 0 ? `address-suggestion-${activeIndex}` : undefined}
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? "address-error" : undefined}
                        className={cn("pr-10", errors.address && "border-destructive")}
                    />
                    <div
                        className={cn(
                            "absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity duration-150",
                            isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
                        )}
                    >
                        <Loader2Icon className="size-4 text-gray-400 animate-spin" strokeWidth={1.8} />
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && suggestions.length > 0 && (
                        <motion.ul
                            id="address-suggestions"
                            role="listbox"
                            aria-label="Address suggestions"
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "absolute z-50 left-0 right-0 top-[calc(100%+6px)]",
                                "bg-white rounded-2xl overflow-hidden",
                                "shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_2px_8px_-2px_rgba(0,0,0,0.06)]",
                                "border border-gray-100",
                                "py-1.5",
                            )}
                        >
                            {suggestions.map((s, index) => (
                                <motion.li
                                    key={`${s.place_id ?? "suggestion"}-${index}`}
                                    id={`address-suggestion-${index}`}
                                    role="option"
                                    aria-selected={activeIndex === index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.1, delay: index * 0.025 }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        selectSuggestion(s);
                                    }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={cn(
                                        "flex items-start gap-3 px-4 py-3 cursor-pointer select-none",
                                        "transition-colors duration-100",
                                        activeIndex === index ? "bg-gray-50" : "hover:bg-gray-50",
                                    )}
                                >
                                    <MapPinIcon
                                        className={cn(
                                            "size-4 shrink-0 mt-0.5 transition-colors duration-100",
                                            activeIndex === index ? "text-gray-950" : "text-gray-350",
                                        )}
                                        strokeWidth={1.7}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-950 leading-snug truncate">
                                            {s.address_line1}
                                        </p>
                                        <p className="text-xs text-gray-400 leading-snug mt-0.5 truncate">
                                            {s.address_line2}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}

                            <li
                                aria-hidden="true"
                                className="px-4 pt-1.5 pb-2 mt-0.5 border-t border-gray-100/80 flex items-center gap-1.5"
                            >
                                <span className="text-xs text-gray-300 tracking-wide leading-none">
                                    Powered by Geoapify
                                </span>
                            </li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </CheckoutField>
    );
}
