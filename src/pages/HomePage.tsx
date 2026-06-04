import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useProducts, useCategories, useStoreInfo } from "@/hooks/useApi";
import { ProductCard } from "@/components/product/ProductCard";
import { Logo } from "@/components/ui/Logo";

export function HomePage() {
  const { data: products = [] } = useProducts({ featured: true, limit: 8 });
  const { data: categories = [] } = useCategories();
  const { data: store } = useStoreInfo();

  return (
    <>
      <Helmet>
        <title>DU$TY — Think Smart, Be Smart | Official DTR Brand</title>
        <meta
          name="description"
          content="Official DU$TY (Dusty the Rapper) merch. The DTR Brand. A brand, not a rapper. Houston-bred, Atlanta-based, Haitian descent."
        />
      </Helmet>

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-bg-primary border-b border-border-subtle">
        {/* Background grain + radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(255,107,26,0.10), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,107,26,0.06), transparent 50%)",
          }}
        />

        <div className="container-x relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-16 md:py-24 lg:py-32">
            {/* Headline */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="eyebrow mb-4 animate-fade-in">
                <span className="inline-block w-8 h-px bg-accent align-middle mr-3" />
                DTR Brand · Est. Houston → Atlanta
              </p>
              <h1 className="heading-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-balance animate-fade-in-up">
                Think Smart,
                <br />
                <span className="text-accent">Be Smart</span>.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-fg-secondary max-w-xl text-pretty animate-fade-in-up">
                The official home of <strong className="text-fg-primary">DU$TY</strong>. Merch
                built to last. Music that hits. A brand, not a rapper.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-8 animate-fade-in-up">
                <Link to="/shop" className="btn-primary">
                  Shop the Drop
                </Link>
                <Link to="/music" className="btn-secondary">
                  Listen Now
                </Link>
              </div>

              {/* Stats / Tickers */}
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
                <Stat label="Drops" value="4" suffix="+" />
                <Stat label="SKUs" value="14" />
                <Stat label="DUSTY" value="BOIS" accent />
              </div>
            </div>

            {/* Hero visual: Spotify embed */}
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full aspect-square bg-bg-secondary border border-border-default p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, rgba(255,107,26,0.6), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <Logo className="w-12 h-12" />
                  <span className="tag">Now Playing</span>
                </div>
                <div className="relative space-y-3">
                  <p className="eyebrow text-accent">Latest</p>
                  <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight leading-none">
                    DU$TY ON THE RISE
                  </h2>
                  <p className="text-sm text-fg-secondary">DTR · 2025</p>
                </div>
                <div className="relative">
                  <iframe
                    title="DU$TY on Spotify"
                    src="https://open.spotify.com/embed/track/4Aa8wBhDX4nKEv1nyLxlf2?utm_source=generator&theme=0"
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="border-t border-border-subtle py-4 overflow-hidden">
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap text-fg-tertiary">
              {[...Array(2)].flatMap((_, i) =>
                [
                  "DUSTY BOIS",
                  "THINK SMART, BE SMART",
                  "HOUSTON → ATLANTA",
                  "COOL COOL, SMART SMART",
                  "DOWN TO RIDE",
                  "CASH ONLY",
                  "🪬",
                  "BURR",
                ].map((t, j) => (
                  <span
                    key={`${i}-${j}`}
                    className="font-display text-2xl md:text-3xl uppercase tracking-widest flex items-center gap-8"
                  >
                    {t}
                    <span className="text-accent">◆</span>
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COLLECTIONS */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <header className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="eyebrow mb-2">Collections</p>
              <h2 className="heading-display text-4xl md:text-5xl">
                Shop the brand
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex font-display text-base uppercase tracking-widest text-fg-secondary hover:text-accent"
            >
              All →
            </Link>
          </header>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.slug}`}
                className="group relative aspect-[3/4] bg-bg-secondary border border-border-subtle overflow-hidden flex flex-col justify-end p-5 hover:border-accent transition-colors"
              >
                <div
                  className="absolute inset-0 transition-transform duration-slow ease-out group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(31,33,40,0.95)), radial-gradient(circle at 50% 50%, rgba(255,107,26,0.15), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-2xs text-accent uppercase tracking-widest mb-1">
                    {cat.productCount} {cat.productCount === 1 ? "Piece" : "Pieces"}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wider leading-none">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED PRODUCTS */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-bg-secondary border-y border-border-subtle">
        <div className="container-x">
          <header className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="eyebrow mb-2">Featured</p>
              <h2 className="heading-display text-4xl md:text-5xl">
                The drop
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex font-display text-base uppercase tracking-widest text-fg-secondary hover:text-accent"
            >
              Shop All →
            </Link>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT TEASER */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-[4/5] bg-bg-secondary border border-border-default overflow-hidden">
              <img
                src="https://placehold.co/800x1000/1F2128/FF6B1A?text=DU%24TY"
                alt="DU$TY portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow mb-3">About the brand</p>
              <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                A brand,
                <br />
                not a rapper.
              </h2>
              <p className="text-lg text-fg-secondary leading-relaxed mb-4">
                Houston-bred. Atlanta-based. Haitian descent. The DTR code is built
                on the chain, the eye, and the hustle. Every piece of merch is
                made to be lived in — and the music? It's the soundtrack.
              </p>
              <p className="text-fg-secondary leading-relaxed mb-8">
                DUSTY BOIS for life. Think Smart, Be Smart. Cool Cool, Smart
                Smart.
              </p>
              <Link to="/about" className="btn-primary">
                Read the Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NEWSLETTER */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 bg-bg-secondary border-y border-border-subtle">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-3">Stay locked in</p>
          <h2 className="heading-display text-4xl md:text-5xl mb-4">
            Join the DUSTY BOIS
          </h2>
          <p className="text-fg-secondary mb-8 max-w-md mx-auto">
            Drops, music, tour dates. First access. No spam — just signal.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = fd.get("email");
              alert(`Thanks for joining, ${email}! (Mock — wire to ESP later.)`);
              e.currentTarget.reset();
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="input flex-1"
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary">
              Join
            </button>
          </form>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DTR Brand",
            alternateName: "DU$TY",
            url: "https://dustytherapper.shop",
            logo: "https://dustytherapper.shop/logo.png",
            sameAs: store?.socialLinks
              ? Object.values(store.socialLinks).filter(Boolean)
              : [],
          }),
        }}
      />
    </>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className={`font-display text-3xl md:text-4xl ${accent ? "text-accent" : "text-fg-primary"}`}
      >
        {value}
        {suffix && <span className="text-accent">{suffix}</span>}
      </p>
      <p className="eyebrow mt-1">{label}</p>
    </div>
  );
}
