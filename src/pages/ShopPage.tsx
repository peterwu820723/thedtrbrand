import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useProducts, useCategory, useCategories } from "@/hooks/useApi";
import { ProductCard } from "@/components/product/ProductCard";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

export function ShopPage() {
  const { collectionSlug } = useParams();
  const { data: categories = [] } = useCategories();
  const { data: activeCategory } = useCategory(collectionSlug ?? "");
  const [sort, setSort] = useState<SortId>("featured");
  const { data: products = [], isLoading } = useProducts(
    collectionSlug
      ? { categorySlug: collectionSlug, sort }
      : { sort },
  );

  const [filters, setFilters] = useState<{
    size: string | null;
    priceMax: number | null;
    inStock: boolean;
  }>({ size: null, priceMax: null, inStock: false });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.size && !p.variants.some((v) => v.size === filters.size)) {
        return false;
      }
      if (filters.priceMax && p.basePrice.amount > filters.priceMax) {
        return false;
      }
      if (filters.inStock && !p.variants.some((v) => v.inStock)) {
        return false;
      }
      return true;
    });
  }, [products, filters]);

  const sizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => v.size && set.add(v.size)));
    return Array.from(set);
  }, [products]);

  return (
    <>
      <Helmet>
        <title>
          {activeCategory
            ? `${activeCategory.name} — DU$TY Shop`
            : "Shop — DU$TY"}
        </title>
        <meta
          name="description"
          content={
            activeCategory?.description ??
            "Shop the DTR Brand. All merch, all drops."
          }
        />
      </Helmet>

      {/* Hero / breadcrumb */}
      <section className="bg-bg-secondary border-b border-border-subtle">
        <div className="container-x py-10 md:py-14">
          <nav className="eyebrow mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2 text-fg-tertiary">/</span>
            <Link to="/shop" className="hover:text-accent">
              Shop
            </Link>
            {activeCategory && (
              <>
                <span className="mx-2 text-fg-tertiary">/</span>
                <span className="text-fg-primary">{activeCategory.name}</span>
              </>
            )}
          </nav>
          <h1 className="heading-display text-4xl md:text-6xl text-balance">
            {activeCategory?.name ?? "All Products"}
          </h1>
          {activeCategory?.description && (
            <p className="mt-3 text-fg-secondary max-w-2xl">
              {activeCategory.description}
            </p>
          )}
        </div>
      </section>

      {/* Collection pills */}
      <section className="border-b border-border-subtle sticky top-16 md:top-20 z-raised bg-bg-primary/95 backdrop-blur-md">
        <div className="container-x overflow-x-auto">
          <div className="flex items-center gap-2 py-4 min-w-max">
            <CollectionPill to="/shop" active={!collectionSlug}>
              All
            </CollectionPill>
            {categories.map((c) => (
              <CollectionPill
                key={c.id}
                to={`/shop/${c.slug}`}
                active={c.slug === collectionSlug}
              >
                {c.name}
              </CollectionPill>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="container-x py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-fg-secondary">
            {isLoading ? "Loading…" : `${filtered.length} products`}
          </p>
          <div className="flex items-center gap-2">
            <label className="text-2xs uppercase tracking-widest text-fg-tertiary">
              Sort
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="bg-bg-secondary border border-border-default text-fg-primary text-sm px-3 py-2 rounded-none focus:border-accent"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="eyebrow">Filter:</span>
          {sizes.length > 0 && (
            <div className="flex items-center gap-1">
              {sizes.slice(0, 6).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setFilters((f) => ({ ...f, size: f.size === s ? null : s }))
                  }
                  className={`w-9 h-9 text-xs font-mono border transition-colors
                    ${
                      filters.size === s
                        ? "border-accent text-accent bg-accent-muted"
                        : "border-border-default text-fg-secondary hover:border-fg-primary"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) =>
                setFilters((f) => ({ ...f, inStock: e.target.checked }))
              }
              className="accent-accent w-4 h-4"
            />
            <span className="text-2xs uppercase tracking-widest">
              In Stock Only
            </span>
          </label>
        </div>
      </section>

      {/* Grid */}
      <section className="container-x pb-16">
        {isLoading ? (
          <div className="py-20 text-center text-fg-secondary">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl uppercase mb-2">No products</p>
            <p className="text-fg-secondary mb-6">
              Try adjusting your filters.
            </p>
            <button
              type="button"
              onClick={() => setFilters({ size: null, priceMax: null, inStock: false })}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function CollectionPill({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`shrink-0 px-3 py-1.5 text-sm font-display uppercase tracking-widest border transition-colors
        ${
          active
            ? "border-accent text-accent bg-accent-muted"
            : "border-border-default text-fg-secondary hover:border-fg-primary hover:text-fg-primary"
        }`}
    >
      {children}
    </Link>
  );
}
