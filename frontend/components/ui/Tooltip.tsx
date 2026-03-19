"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  function show() {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 8,
        left: rect.left + rect.width / 2,
      });
    }
    setVisible(true);
  }

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center gap-1 cursor-default"
      onMouseEnter={show}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && typeof document !== "undefined" && createPortal(
        <span
          style={{ top: coords.top, left: coords.left }}
          className="fixed -translate-x-1/2 -translate-y-full w-56 rounded-md bg-foreground text-background text-xs px-3 py-2 shadow-lg z-[9999] leading-snug pointer-events-none"
        >
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </span>,
        document.body
      )}
    </span>
  );
}
