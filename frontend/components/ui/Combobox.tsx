"use client";

import { useEffect, useRef, useState } from "react";

export interface ComboboxOption {
  value: number | string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: number | string | null;
  onChange: (value: number | string | null) => void;
  placeholder?: string;
}

export function Combobox({ options, value, onChange, placeholder = "Selecionar..." }: ComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(option: ComboboxOption) {
    onChange(option.value);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center w-full rounded-md bg-background border border-border focus-within:ring-2 focus-within:ring-primary-500 transition-shadow">
        <input
          className="flex-1 px-3 py-2 text-sm bg-transparent text-foreground placeholder:text-muted outline-none"
          placeholder={selected ? selected.label : placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {selected && (
          <button
            type="button"
            onClick={() => { onChange(null); setQuery(""); }}
            className="pr-3 text-muted hover:text-foreground text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-1 max-h-52 overflow-y-auto rounded-md bg-background border border-border shadow-lg">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted">Nenhum resultado.</p>
          ) : (
            filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={[
                  "w-full text-left px-3 py-2 text-sm transition-colors",
                  option.value === value
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                    : "text-foreground hover:bg-surface",
                ].join(" ")}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
