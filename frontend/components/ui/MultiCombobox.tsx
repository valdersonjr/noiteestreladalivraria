"use client";

import { useEffect, useRef, useState } from "react";
import type { ComboboxOption } from "./Combobox";

interface MultiComboboxProps {
  options: ComboboxOption[];
  value: (number | string)[];
  onChange: (value: (number | string)[]) => void;
  placeholder?: string;
}

export function MultiCombobox({ options, value, onChange, placeholder = "Selecionar..." }: MultiComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((o) => value.includes(o.value));
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

  function toggle(option: ComboboxOption) {
    if (value.includes(option.value)) {
      onChange(value.filter((v) => v !== option.value));
    } else {
      onChange([...value, option.value]);
    }
    setQuery("");
  }

  function remove(v: number | string) {
    onChange(value.filter((x) => x !== v));
  }

  return (
    <div ref={ref} className="relative">
      <div
        className="flex flex-wrap gap-1.5 w-full min-h-10 px-2 py-1.5 rounded-md bg-background border border-border focus-within:ring-2 focus-within:ring-primary-500 transition-shadow cursor-text"
        onClick={() => setOpen(true)}
      >
        {selectedOptions.map((o) => (
          <span
            key={o.value}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
          >
            {o.label}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); remove(o.value); }}
              className="hover:opacity-70 leading-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="flex-1 min-w-24 bg-transparent text-sm text-foreground placeholder:text-muted outline-none py-0.5"
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-1 max-h-52 overflow-y-auto rounded-md bg-background border border-border shadow-lg">
          {filtered.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted">Nenhum resultado.</p>
          ) : (
            filtered.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggle(option)}
                  className={[
                    "w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2",
                    isSelected
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      : "text-foreground hover:bg-surface",
                  ].join(" ")}
                >
                  <span className={["w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
                    isSelected ? "bg-primary-600 border-primary-600 text-on-primary" : "border-border"
                  ].join(" ")}>
                    {isSelected && "✓"}
                  </span>
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
