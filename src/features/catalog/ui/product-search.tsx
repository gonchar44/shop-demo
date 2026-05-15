"use client";

import { useState, useRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";

export function ProductSearch() {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClear() {
        setValue("");
        inputRef.current?.focus();
    }

    return (
        <div className="w-96" role="search" aria-label="Search products">
            <label htmlFor="product-search" className="sr-only">
                Search products
            </label>

            <div className="relative flex items-center group">
                <SearchIcon
                    className="absolute left-4 size-4 text-gray-400 pointer-events-none transition-colors duration-150 group-focus-within:text-gray-950"
                    strokeWidth={2}
                    aria-hidden
                />

                <input
                    ref={inputRef}
                    id="product-search"
                    type="search"
                    autoComplete="off"
                    spellCheck={false}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search items…"
                    className="w-full h-12 pl-11 pr-10 bg-gray-100 rounded-2xl text-sm text-gray-950 placeholder:text-gray-400 border border-transparent outline-none transition-all duration-150 focus:bg-white focus:border-gray-950 [&::-webkit-search-cancel-button]:hidden"
                />

                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="Clear search"
                        className="cursor-pointer absolute right-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-950 text-gray-600 hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-1"
                    >
                        <XIcon className="size-3" strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    );
}
