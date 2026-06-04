import { useState } from "react";
import { useParams } from "react-router-dom";

interface VariantSelectorProps {
  variants: Array<{
    id: string;
    title: string;
    size?: string;
    color?: string;
    inStock: boolean;
  }>;
  value: string | null;
  onChange: (variantId: string) => void;
}

export function VariantSelector({ variants, value, onChange }: VariantSelectorProps) {
  const { productSlug } = useParams();
  void productSlug;
  const [activeColor, setActiveColor] = useState<string | null>(
    variants[0]?.color ?? null,
  );

  // Group by color
  const byColor = variants.reduce<Record<string, typeof variants>>((acc, v) => {
    const c = v.color ?? "default";
    (acc[c] ??= []).push(v);
    return acc;
  }, {});

  const colors = Object.keys(byColor);
  const sizesForColor = (color: string) => byColor[color] ?? [];

  return (
    <div className="space-y-4">
      {/* Color picker */}
      {colors.length > 1 && (
        <div>
          <p className="eyebrow mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  setActiveColor(color);
                  const first = sizesForColor(color).find((v) => v.inStock);
                  if (first) onChange(first.id);
                }}
                className={`px-3 py-2 border text-sm uppercase tracking-wide transition-colors
                  ${
                    activeColor === color
                      ? "border-accent text-accent"
                      : "border-border-default text-fg-secondary hover:border-fg-primary"
                  }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size picker */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <p className="eyebrow">Size</p>
          <button
            type="button"
            className="text-2xs text-fg-tertiary hover:text-accent underline"
            onClick={() => alert("Size guide coming soon — check measurements on each product page.")}
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {(activeColor ? sizesForColor(activeColor) : variants).map((v) => {
            const selected = value === v.id;
            return (
              <button
                key={v.id}
                type="button"
                disabled={!v.inStock}
                onClick={() => onChange(v.id)}
                className={`relative py-3 border text-sm font-mono uppercase transition-colors
                  ${
                    selected
                      ? "border-accent text-accent bg-accent-muted"
                      : v.inStock
                        ? "border-border-default text-fg-primary hover:border-fg-primary"
                        : "border-border-subtle text-fg-tertiary cursor-not-allowed"
                  }`}
                aria-label={`Size ${v.size ?? v.title}${!v.inStock ? " (out of stock)" : ""}`}
              >
                {v.size ?? v.title}
                {!v.inStock && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block w-full h-px bg-fg-tertiary rotate-45 origin-center" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
