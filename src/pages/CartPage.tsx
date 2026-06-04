import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/hooks/useApi";
import { formatMoney } from "@/types/domain";

export function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  if (isLoading) {
    return <div className="container-x py-32 text-center text-fg-secondary">Loading…</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container-x py-24 md:py-32 text-center">
        <Helmet>
          <title>Your Bag — DU$TY Shop</title>
        </Helmet>
        <p className="eyebrow mb-2">Your Bag</p>
        <h1 className="heading-display text-4xl md:text-6xl mb-4">Empty</h1>
        <p className="text-fg-secondary mb-8">
          Find your fit in the shop.
        </p>
        <Link to="/shop" className="btn-primary">
          Shop the Drop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Bag — DU$TY Shop</title>
      </Helmet>

      <section className="container-x py-10 md:py-16">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">Your Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Items */}
          <ul className="lg:col-span-2 space-y-3">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 p-3 md:p-4 bg-bg-secondary border border-border-subtle"
              >
                <Link
                  to={`/product/${item.productId}`}
                  className="shrink-0 w-20 md:w-28 aspect-[4/5] bg-bg-elevated overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productTitle}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-display text-lg md:text-xl uppercase tracking-wide hover:text-accent line-clamp-1"
                      >
                        {item.productTitle}
                      </Link>
                      <p className="text-2xs text-fg-secondary uppercase tracking-wide">
                        {item.variantTitle}
                      </p>
                    </div>
                    <span className="font-mono text-sm md:text-base whitespace-nowrap">
                      {formatMoney(item.lineTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="inline-flex items-center border border-border-default">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center hover:text-accent"
                        aria-label="Decrease"
                        onClick={() =>
                          updateItem.mutate({
                            itemId: item.id,
                            quantity: Math.max(0, item.quantity - 1),
                          })
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-mono text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center hover:text-accent"
                        aria-label="Increase"
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
                    <button
                      type="button"
                      onClick={() => removeItem.mutate(item.id)}
                      className="text-2xs text-fg-tertiary uppercase tracking-wide hover:text-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-bg-secondary border border-border-subtle p-6 space-y-4 lg:sticky lg:top-32">
              <h2 className="font-display text-xl uppercase tracking-widest">
                Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Subtotal</span>
                  <span className="font-mono">{formatMoney(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-fg-tertiary">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-fg-tertiary">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-border-subtle pt-3 flex justify-between items-baseline">
                <span className="font-display uppercase tracking-wide">Total</span>
                <span className="font-display text-2xl">
                  {formatMoney(cart.subtotal)}
                </span>
              </div>
              <Link to="/checkout" className="btn-primary w-full">
                Checkout
              </Link>
              <Link
                to="/shop"
                className="block text-center text-2xs uppercase tracking-widest text-fg-tertiary hover:text-accent"
              >
                ← Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
