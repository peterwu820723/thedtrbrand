import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatMoney } from "@/types/domain";
import type { Order } from "@/types/domain";

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (typeof localStorage === "undefined" || !orderId) return;
    try {
      const orders = JSON.parse(localStorage.getItem("dtr_orders_v1") ?? "[]") as Order[];
      const found = orders.find((o) => o.id === orderId) ?? null;
      setOrder(found);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-x py-24 text-center">
        <p className="eyebrow mb-2">Order</p>
        <h1 className="heading-display text-4xl mb-4">Not Found</h1>
        <p className="text-fg-secondary mb-8">
          We couldn't find that order. Check your confirmation email or contact support.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order {order.number} — DU$TY</title>
      </Helmet>
      <section className="container-x py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow text-success mb-2">Order Confirmed</p>
          <h1 className="heading-display text-5xl md:text-6xl mb-4">
            Thank you
          </h1>
          <p className="text-fg-secondary">
            Your order <span className="font-mono text-accent">{order.number}</span>{" "}
            has been placed. We've sent a confirmation to{" "}
            <span className="text-fg-primary">{order.contact.email}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-xl uppercase tracking-widest">
              Items
            </h2>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 bg-bg-secondary border border-border-subtle"
                >
                  <div className="shrink-0 w-16 aspect-square bg-bg-elevated overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.productTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display uppercase tracking-wide line-clamp-1">
                      {item.productTitle}
                    </p>
                    <p className="text-2xs text-fg-secondary">
                      {item.variantTitle} · ×{item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-sm">
                    {formatMoney(item.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="bg-bg-secondary border border-border-subtle p-6 space-y-3">
              <h2 className="font-display text-lg uppercase tracking-widest">
                Summary
              </h2>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Subtotal</span>
                  <span className="font-mono">{formatMoney(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Shipping</span>
                  <span className="font-mono">{formatMoney(order.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Tax</span>
                  <span className="font-mono">{formatMoney(order.tax)}</span>
                </div>
              </div>
              <div className="border-t border-border-subtle pt-3 flex justify-between items-baseline">
                <span className="font-display uppercase tracking-wide">Total</span>
                <span className="font-display text-2xl">
                  {formatMoney(order.total)}
                </span>
              </div>
            </div>

            <div className="bg-bg-secondary border border-border-subtle p-6 space-y-2 text-sm">
              <h2 className="font-display text-lg uppercase tracking-widest mb-2">
                Shipping to
              </h2>
              <p className="text-fg-primary">{order.shippingAddress.fullName}</p>
              <p className="text-fg-secondary">
                {order.shippingAddress.street1}
                {order.shippingAddress.street2 && `, ${order.shippingAddress.street2}`}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </p>
              {order.estimatedDelivery && (
                <p className="text-2xs text-fg-tertiary pt-2">
                  Estimated delivery:{" "}
                  {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            <Link to="/shop" className="btn-primary w-full">
              Keep Shopping
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
