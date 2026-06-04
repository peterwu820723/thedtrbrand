import { Link } from "react-router-dom";
import { useUIStore } from "@/stores/uiStore";
import { useCart, useRemoveCartItem, useUpdateCartItem } from "@/hooks/useApi";
import { formatMoney } from "@/types/domain";
import { useEffect } from "react";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartDrawerOpen);
  const close = useUIStore((s) => s.closeCartDrawer);
  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-overlay bg-black/60 transition-opacity duration-normal
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={close}
        aria-hidden
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-modal h-full w-full max-w-md
                   bg-bg-secondary border-l border-border-default
                   flex flex-col
                   transition-transform duration-slow ease-out
                   ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between p-6 border-b border-border-subtle">
          <h2 className="font-display text-2xl uppercase tracking-widest">
            Your Bag
          </h2>
          <button
            type="button"
            onClick={close}
            className="p-2 -mr-2 hover:text-accent transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading ? (
            <p className="text-fg-secondary">Loading…</p>
          ) : !cart || cart.items.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display text-2xl uppercase mb-2">Bag is empty</p>
              <p className="text-fg-secondary text-sm mb-6">Find your fit in the shop.</p>
              <Link
                to="/shop"
                onClick={close}
                className="btn-primary"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 bg-bg-primary border border-border-subtle"
                >
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={close}
                    className="shrink-0 w-20 h-24 bg-bg-elevated overflow-hidden"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productTitle}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.productId}`}
                      onClick={close}
                      className="font-display text-base uppercase tracking-wide hover:text-accent line-clamp-1"
                    >
                      {item.productTitle}
                    </Link>
                    <p className="text-2xs text-fg-secondary uppercase tracking-wide mb-2">
                      {item.variantTitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center border border-border-default">
                        <button
                          type="button"
                          className="w-7 h-7 flex items-center justify-center hover:text-accent"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateItem.mutate({
                              itemId: item.id,
                              quantity: Math.max(0, item.quantity - 1),
                            })
                          }
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-mono">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-7 h-7 flex items-center justify-center hover:text-accent"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateItem.mutate({
                              itemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                      <span className="font-mono text-sm">
                        {formatMoney(item.lineTotal)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem.mutate(item.id)}
                      className="text-2xs text-fg-tertiary uppercase tracking-wide hover:text-error mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <footer className="border-t border-border-subtle p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-fg-secondary uppercase tracking-wide text-sm">
                Subtotal
              </span>
              <span className="font-display text-2xl">
                {formatMoney(cart.subtotal)}
              </span>
            </div>
            <p className="text-2xs text-fg-tertiary">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              to="/cart"
              onClick={close}
              className="btn-secondary w-full"
            >
              View Bag
            </Link>
            <Link
              to="/checkout"
              onClick={close}
              className="btn-primary w-full"
            >
              Checkout
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
