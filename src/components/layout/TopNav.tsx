import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/uiStore";
import { useCart } from "@/hooks/useApi";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/music", label: "Music" },
  { to: "/about", label: "About" },
  { to: "/tour", label: "Tour" },
  { to: "/contact", label: "Contact" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const openCart = useUIStore((s) => s.openCartDrawer);
  const toggleMobile = useUIStore((s) => s.toggleMobileMenu);
  const { data: cart } = useCart();
  const cartCount = cart?.itemCount ?? 0;
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-raised transition-all duration-normal
        ${scrolled ? "bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle" : "bg-bg-primary/0"}
      `}
    >
      {/* Announcement bar */}
      <div className="bg-accent text-bg-primary">
        <div className="container-x py-1.5 text-center">
          <p className="font-display text-xs md:text-sm uppercase tracking-widest font-bold">
            Free US shipping on orders $150+ · Think Smart, Be Smart 🪬
          </p>
        </div>
      </div>

      <div className="container-x">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu trigger */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2"
            aria-label="Open menu"
            onClick={toggleMobile}
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <span className="hidden md:inline-block font-display text-2xl tracking-widest">
              DU<span className="text-accent">$</span>TY
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `font-display text-base uppercase tracking-wide transition-colors duration-fast
                   ${isActive ? "text-accent" : "text-fg-primary hover:text-accent"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden md:inline-flex p-2 hover:text-accent transition-colors"
              aria-label="Search"
              onClick={() => navigate("/shop")}
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className="relative p-2 hover:text-accent transition-colors"
              aria-label={`Cart with ${cartCount} items`}
              onClick={openCart}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5
                             bg-accent text-bg-primary
                             text-2xs font-bold leading-none
                             w-5 h-5 rounded-pill
                             flex items-center justify-center
                             animate-scale-in"
                  aria-hidden
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </svg>
);
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
);
