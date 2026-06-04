import { Link } from "react-router-dom";
import { useUIStore } from "@/stores/uiStore";
import { Logo } from "@/components/ui/Logo";
import { useEffect } from "react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/music", label: "Music" },
  { to: "/about", label: "About" },
  { to: "/tour", label: "Tour" },
  { to: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <div
        className={`fixed inset-0 z-overlay bg-black/60 transition-opacity duration-normal lg:hidden
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={close}
        aria-hidden
      />
      <aside
        className={`fixed top-0 left-0 z-modal h-full w-full max-w-xs
                   bg-bg-primary border-r border-border-subtle
                   flex flex-col lg:hidden
                   transition-transform duration-slow ease-out
                   ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Mobile menu"
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between p-6 border-b border-border-subtle">
          <Link to="/" onClick={close} className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-display text-xl tracking-widest">
              DU<span className="text-accent">$</span>TY
            </span>
          </Link>
          <button
            type="button"
            onClick={close}
            className="p-2 -mr-2 hover:text-accent"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <nav className="flex-1 px-6 py-8" aria-label="Mobile">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={close}
                  className="font-display text-3xl uppercase tracking-widest hover:text-accent transition-colors block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="p-6 border-t border-border-subtle">
          <p className="eyebrow">DUSTY BOIS 🪬</p>
        </footer>
      </aside>
    </>
  );
}
