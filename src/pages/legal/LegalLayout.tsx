import { Outlet, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const legalLinks = [
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/terms", label: "Terms of Service" },
  { to: "/legal/shipping", label: "Shipping Policy" },
  { to: "/legal/returns", label: "Returns Policy" },
];

export function LegalLayout() {
  return (
    <div className="container-x py-10 md:py-16">
      <Helmet>
        <title>Legal — DU$TY</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside>
          <h2 className="font-display text-xl uppercase tracking-widest mb-4">
            Legal
          </h2>
          <nav aria-label="Legal">
            <ul className="space-y-1">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 text-sm uppercase tracking-wide border-l-2 transition-colors
                      ${
                        isActive
                          ? "border-accent text-accent bg-accent-muted"
                          : "border-transparent text-fg-secondary hover:border-fg-primary hover:text-fg-primary"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="lg:col-span-3 prose-legal">
          <Outlet />
        </article>
      </div>
    </div>
  );
}
