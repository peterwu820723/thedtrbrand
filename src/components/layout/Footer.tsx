import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { useStoreInfo } from "@/hooks/useApi";

export function Footer() {
  const { data: store } = useStoreInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle mt-24">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <Logo className="w-10 h-10" />
              <span className="font-display text-2xl tracking-widest">
                DU<span className="text-accent">$</span>TY
              </span>
            </Link>
            <p className="font-display text-sm uppercase tracking-widest text-fg-secondary mb-3">
              {store?.tagline ?? "Think Smart, Be Smart"}
            </p>
            <p className="text-sm text-fg-secondary leading-relaxed max-w-xs">
              DTR Brand LLC. Merch from DU$TY — a brand, not a rapper.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-fg-tertiary mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/shop", label: "All Products" },
                { to: "/shop/dtr-logo", label: "DTR Logo" },
                { to: "/shop/the-chain", label: "The Chain" },
                { to: "/shop/dusty-haiti", label: "Dusty Haiti" },
                { to: "/shop/big-dusty", label: "Big Dusty" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-fg-tertiary mb-4">
              Brand
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About" },
                { to: "/music", label: "Music" },
                { to: "/tour", label: "Tour" },
                { to: "/contact", label: "Contact" },
                { to: "/legal/shipping", label: "Shipping" },
                { to: "/legal/returns", label: "Returns" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-fg-tertiary mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              {store?.socialLinks?.instagram && (
                <li>
                  <a
                    href={store.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    Instagram →
                  </a>
                </li>
              )}
              {store?.socialLinks?.spotify && (
                <li>
                  <a
                    href={store.socialLinks.spotify}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    Spotify →
                  </a>
                </li>
              )}
              {store?.socialLinks?.youtube && (
                <li>
                  <a
                    href={store.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    YouTube →
                  </a>
                </li>
              )}
              {store?.socialLinks?.soundcloud && (
                <li>
                  <a
                    href={store.socialLinks.soundcloud}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    SoundCloud →
                  </a>
                </li>
              )}
              {store?.socialLinks?.tiktok && (
                <li>
                  <a
                    href={store.socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-fg-secondary hover:text-accent transition-colors"
                  >
                    TikTok →
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-fg-tertiary">
            © {year} DTR Brand LLC. All rights reserved.
          </p>
          <ul className="flex items-center gap-4 text-xs text-fg-tertiary">
            {import.meta.env.DEV && (
              <li>
                <Link
                  to="/__api"
                  className="hover:text-accent transition"
                  title="Dev only: API playground"
                >
                  🔌 API
                </Link>
              </li>
            )}
            <li>
              <Link to="/legal/privacy" className="hover:text-accent">Privacy</Link>
            </li>
            <li>
              <Link to="/legal/terms" className="hover:text-accent">Terms</Link>
            </li>
            <li>
              <Link to="/legal/shipping" className="hover:text-accent">Shipping</Link>
            </li>
            <li>
              <Link to="/legal/returns" className="hover:text-accent">Returns</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
