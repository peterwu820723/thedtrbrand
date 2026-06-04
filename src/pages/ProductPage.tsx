import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useProduct, useRelatedProducts, useAddToCart } from "@/hooks/useApi";
import { VariantSelector } from "@/components/product/VariantSelector";
import { ProductCard } from "@/components/product/ProductCard";
import { formatMoney } from "@/types/domain";
import { useUIStore } from "@/stores/uiStore";

export function ProductPage() {
  const { productSlug } = useParams();
  const { data: product, isLoading } = useProduct(productSlug ?? "");
  const { data: related = [] } = useRelatedProducts(product?.id ?? "");
  const addToCart = useAddToCart();
  const openCart = useUIStore((s) => s.openCartDrawer);

  const [variantId, setVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  if (isLoading) {
    return <div className="container-x py-32 text-center text-fg-secondary">Loading…</div>;
  }
  if (!product) {
    return (
      <div className="container-x py-32 text-center">
        <p className="font-display text-3xl mb-4">Product not found</p>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const selectedVariant =
    product.variants.find((v) => v.id === variantId) ??
    product.variants.find((v) => v.inStock) ??
    product.variants[0];

  if (!selectedVariant) {
    return <div className="container-x py-32 text-center">No variants</div>;
  }

  const handleAdd = async () => {
    if (!selectedVariant.inStock) return;
    await addToCart.mutateAsync({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    });
    openCart();
  };

  return (
    <>
      <Helmet>
        <title>{product.title} — DU$TY Shop</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="container-x pt-6">
        <nav className="eyebrow" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2 text-fg-tertiary">/</span>
          <Link to="/shop" className="hover:text-accent">Shop</Link>
          <span className="mx-2 text-fg-tertiary">/</span>
          <span className="text-fg-primary">{product.title}</span>
        </nav>
      </div>

      <section className="container-x py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-bg-secondary border border-border-subtle overflow-hidden">
              {product.images[activeImage] && (
                <img
                  src={product.images[activeImage].url}
                  alt={product.images[activeImage].alt}
                  className="w-full h-full object-cover animate-fade-in"
                  key={activeImage}
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden border transition-colors
                      ${
                        i === activeImage
                          ? "border-accent"
                          : "border-border-subtle hover:border-border-default"
                      }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      aria-hidden
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-32 self-start space-y-6">
            <div>
              {product.isNew && <span className="tag mb-3">New Drop</span>}
              <h1 className="heading-display text-3xl md:text-5xl mb-2 text-balance">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="text-lg text-fg-secondary">{product.subtitle}</p>
              )}
              <p className="font-mono text-2xl mt-4 text-accent">
                {formatMoney(product.basePrice)}
              </p>
            </div>

            <VariantSelector
              variants={product.variants}
              value={selectedVariant.id}
              onChange={setVariantId}
            />

            {/* Quantity + Add */}
            <div className="flex items-stretch gap-3">
              <div className="inline-flex items-center border border-border-default">
                <button
                  type="button"
                  className="w-10 h-12 flex items-center justify-center hover:text-accent"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="w-10 text-center font-mono">{quantity}</span>
                <button
                  type="button"
                  className="w-10 h-12 flex items-center justify-center hover:text-accent"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!selectedVariant.inStock || addToCart.isPending}
                className="btn-primary flex-1"
              >
                {addToCart.isPending
                  ? "Adding…"
                  : selectedVariant.inStock
                    ? "Add to Bag"
                    : "Sold Out"}
              </button>
            </div>

            {/* Stock indicator */}
            <p className="text-2xs uppercase tracking-widest">
              {selectedVariant.inStock ? (
                <span className="text-success">
                  ● In Stock — Ships in 1-2 business days
                </span>
              ) : (
                <span className="text-error">● Sold Out</span>
              )}
            </p>

            {/* Accordion */}
            <div className="border-t border-border-subtle">
              {[
                {
                  id: "details",
                  title: "Details",
                  body: product.description,
                },
                {
                  id: "shipping",
                  title: "Shipping & Returns",
                  body: "Free US shipping on orders $150+. International rates calculated at checkout. 30-day returns on unworn items with tags. See our full Shipping and Returns policies for details.",
                },
                {
                  id: "care",
                  title: "Care",
                  body: "Cold wash inside-out. Tumble dry low. Iron reverse side only. Do not bleach.",
                },
              ].map((section) => (
                <div key={section.id} className="border-b border-border-subtle">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion((cur) => (cur === section.id ? null : section.id))
                    }
                    className="w-full flex items-center justify-between py-4 font-display uppercase tracking-widest text-base hover:text-accent"
                    aria-expanded={openAccordion === section.id}
                  >
                    {section.title}
                    <span className="text-2xl">
                      {openAccordion === section.id ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordion === section.id && (
                    <div className="pb-4 text-fg-secondary leading-relaxed">
                      {section.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-16 border-t border-border-subtle">
          <h2 className="heading-display text-3xl md:text-4xl mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
