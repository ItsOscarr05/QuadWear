"use client";

import type { ColorVariant } from "@/lib/colorVariants";

interface ColorSwatchRowProps {
  variants: ColorVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export default function ColorSwatchRow({
  variants,
  selectedIndex,
  onSelect,
  size = "md",
  className = "",
}: ColorSwatchRowProps) {
  if (variants.length === 0) return null;

  const dim = size === "sm" ? "h-4 w-4" : "h-6 w-6";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="list">
      {variants.map((v, i) => {
        const active = i === selectedIndex;
        const isLight =
          /^#f/i.test(v.hex.trim()) ||
          v.name.toLowerCase() === "white";
        return (
          <button
            key={`${v.name}-${i}`}
            type="button"
            role="listitem"
            title={v.name}
            aria-label={`Color ${v.name}`}
            aria-pressed={active}
            onClick={() => onSelect(i)}
            className={`${dim} shrink-0 rounded-full border-2 border-black transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              active
                ? "ring-2 ring-primary ring-offset-2"
                : "ring-1 ring-gray-300 hover:ring-gray-500"
            } ${isLight ? "border-gray-400" : ""}`}
            style={{ backgroundColor: v.hex }}
          />
        );
      })}
    </div>
  );
}
