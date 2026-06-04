import { Link } from "react-router-dom";
import { formatMoney } from "@/types/domain";
import type { Product } from "@/types/domain";

interface ProductCardProps {
  product: Product;
  eager?: boolean;
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block card overflow-hidden"
      aria-label={`${product.title} — ${formatMoney(product.basePrice)}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-elevated">
        {product.images[0] && (
          <img
            src={product.images[0].url}
            alt={product.images[0].alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-slow ease-out group-hover:scale-105"
          />
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="tag">New</span>}
        </div>
        {product.images[1] && (
          <img
            src={product.images[1].url}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-slow group-hover:opacity-100"
          />
        )}
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-display text-lg uppercase tracking-wide leading-snug group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="text-2xs text-fg-secondary uppercase tracking-wide line-clamp-1">
            {product.subtitle}
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-sm">{formatMoney(product.basePrice)}</span>
          <span className="text-2xs uppercase tracking-widest text-fg-tertiary group-hover:text-accent transition-colors">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
