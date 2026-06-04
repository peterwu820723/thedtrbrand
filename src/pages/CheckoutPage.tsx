import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useCreateOrder, useShippingOptions } from "@/hooks/useApi";
import { formatMoney } from "@/types/domain";
import type { ShippingAddress } from "@/types/domain";

const STEPS = [
  { id: "contact", label: "Contact" },
  { id: "shipping", label: "Shipping" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: shippingOptions = [] } = useShippingOptions();
  const createOrder = useCreateOrder();

  const [step, setStep] = useState<StepId>("contact");
  const [contact, setContact] = useState({ email: "", marketingOptIn: false });
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    phone: "",
  });
  const [shippingOptionId, setShippingOptionId] = useState<string>(
    shippingOptions[0]?.id ?? "",
  );
  const [card, setCard] = useState({ number: "", exp: "", cvc: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (cartLoading) {
    return <div className="container-x py-32 text-center text-fg-secondary">Loading…</div>;
  }
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container-x py-32 text-center">
        <p className="font-display text-3xl mb-4">Your bag is empty</p>
        <Link to="/shop" className="btn-primary">
          Shop the Drop
        </Link>
      </div>
    );
  }

  const selectedShipping = shippingOptions.find((s) => s.id === shippingOptionId);
  const subtotalCents = cart.subtotal.amount;
  const shippingCents = selectedShipping?.price.amount ?? 0;
  const taxCents = Math.round(subtotalCents * 0.08);
  const totalCents = subtotalCents + shippingCents + taxCents;

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const next = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx < STEPS.length - 1) {
      const nextStep = STEPS[idx + 1];
      if (nextStep) setStep(nextStep.id);
    }
  };
  const back = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx > 0) {
      const prevStep = STEPS[idx - 1];
      if (prevStep) setStep(prevStep.id);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!selectedShipping) {
      setError("Please select a shipping method.");
      return;
    }
    setSubmitting(true);
    try {
      const order = await createOrder.mutateAsync({
        contact,
        shippingAddress: address,
        shippingOptionId: selectedShipping.id,
      });
      navigate(`/order/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order failed");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout — DU$TY Shop</title>
      </Helmet>

      <section className="container-x py-10 md:py-16">
        <h1 className="heading-display text-4xl md:text-5xl mb-8">Checkout</h1>

        {/* Stepper */}
        <ol className="flex items-center gap-2 mb-8 overflow-x-auto">
          {STEPS.map((s, i) => {
            const active = i === stepIndex;
            const done = i < stepIndex;
            return (
              <li
                key={s.id}
                className={`shrink-0 flex items-center gap-2 font-display text-sm uppercase tracking-widest
                  ${active ? "text-accent" : done ? "text-fg-secondary" : "text-fg-tertiary"}`}
              >
                <span
                  className={`w-7 h-7 inline-flex items-center justify-center border
                  ${active ? "border-accent bg-accent text-bg-primary" : done ? "border-fg-secondary" : "border-border-default"}`}
                >
                  {done ? "✓" : i + 1}
                </span>
                {s.label}
                {i < STEPS.length - 1 && (
                  <span className="hidden md:inline-block w-8 h-px bg-border-default" />
                )}
              </li>
            );
          })}
        </ol>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-2 space-y-6">
            {step === "contact" && (
              <StepCard title="Contact">
                <label className="block">
                  <span className="eyebrow block mb-2">Email</span>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, email: e.target.value }))
                    }
                    className="input"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="flex items-center gap-2 cursor-pointer mt-4">
                  <input
                    type="checkbox"
                    checked={contact.marketingOptIn}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, marketingOptIn: e.target.checked }))
                    }
                    className="accent-accent w-4 h-4"
                  />
                  <span className="text-sm text-fg-secondary">
                    Email me drops, music, and tour news.
                  </span>
                </label>
              </StepCard>
            )}

            {step === "shipping" && (
              <StepCard title="Shipping Address">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    required
                    value={address.fullName}
                    onChange={(v) => setAddress((a) => ({ ...a, fullName: v }))}
                  />
                  <Field
                    label="Phone (optional)"
                    value={address.phone ?? ""}
                    onChange={(v) => setAddress((a) => ({ ...a, phone: v }))}
                  />
                  <Field
                    label="Street Address"
                    required
                    className="md:col-span-2"
                    value={address.street1}
                    onChange={(v) => setAddress((a) => ({ ...a, street1: v }))}
                  />
                  <Field
                    label="Apt / Suite (optional)"
                    className="md:col-span-2"
                    value={address.street2 ?? ""}
                    onChange={(v) => setAddress((a) => ({ ...a, street2: v }))}
                  />
                  <Field
                    label="City"
                    required
                    value={address.city}
                    onChange={(v) => setAddress((a) => ({ ...a, city: v }))}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="State"
                      required
                      value={address.state}
                      onChange={(v) => setAddress((a) => ({ ...a, state: v }))}
                    />
                    <Field
                      label="ZIP"
                      required
                      value={address.postalCode}
                      onChange={(v) =>
                        setAddress((a) => ({ ...a, postalCode: v }))
                      }
                    />
                  </div>
                  <Field
                    label="Country"
                    required
                    className="md:col-span-2"
                    value={address.country}
                    onChange={(v) => setAddress((a) => ({ ...a, country: v }))}
                  />
                </div>
              </StepCard>
            )}

            {step === "delivery" && (
              <StepCard title="Shipping Method">
                <div className="space-y-2">
                  {shippingOptions.map((opt) => {
                    const selected = opt.id === shippingOptionId;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors
                          ${
                            selected
                              ? "border-accent bg-accent-muted"
                              : "border-border-default hover:border-fg-primary"
                          }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={selected}
                          onChange={() => setShippingOptionId(opt.id)}
                          className="accent-accent"
                        />
                        <div className="flex-1">
                          <p className="font-display text-base uppercase tracking-wide">
                            {opt.name}
                          </p>
                          <p className="text-2xs text-fg-secondary">
                            {opt.description}
                          </p>
                        </div>
                        <span className="font-mono">{formatMoney(opt.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </StepCard>
            )}

            {step === "payment" && (
              <StepCard title="Payment">
                <p className="text-sm text-fg-secondary mb-4">
                  Demo mode — no real card charged. Real Stripe integration planned in v1.1.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Card Number"
                    required
                    placeholder="4242 4242 4242 4242"
                    className="md:col-span-2"
                    value={card.number}
                    onChange={(v) => setCard((c) => ({ ...c, number: v }))}
                  />
                  <Field
                    label="Expiration"
                    required
                    placeholder="MM/YY"
                    value={card.exp}
                    onChange={(v) => setCard((c) => ({ ...c, exp: v }))}
                  />
                  <Field
                    label="CVC"
                    required
                    placeholder="123"
                    value={card.cvc}
                    onChange={(v) => setCard((c) => ({ ...c, cvc: v }))}
                  />
                  <Field
                    label="Name on Card"
                    required
                    className="md:col-span-2"
                    value={card.name}
                    onChange={(v) => setCard((c) => ({ ...c, name: v }))}
                  />
                </div>
                {error && (
                  <p className="mt-4 text-sm text-error">{error}</p>
                )}
              </StepCard>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between pt-4">
              {stepIndex > 0 ? (
                <button type="button" onClick={back} className="btn-ghost">
                  ← Back
                </button>
              ) : (
                <Link to="/cart" className="btn-ghost">
                  ← Back to bag
                </Link>
              )}
              {step !== "payment" ? (
                <button type="button" onClick={next} className="btn-primary">
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                >
                  {submitting ? "Placing order…" : `Place Order — ${formatMoney({ amount: totalCents, currency: "USD" })}`}
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-bg-secondary border border-border-subtle p-6 space-y-4 lg:sticky lg:top-32">
              <h2 className="font-display text-xl uppercase tracking-widest">
                Order Summary
              </h2>
              <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm">
                    <div className="shrink-0 w-14 aspect-square bg-bg-elevated overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 font-display text-sm uppercase tracking-wide">
                        {item.productTitle}
                      </p>
                      <p className="text-2xs text-fg-secondary">
                        {item.variantTitle} · ×{item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-sm whitespace-nowrap">
                      {formatMoney(item.lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 text-sm border-t border-border-subtle pt-4">
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Subtotal</span>
                  <span className="font-mono">{formatMoney({ amount: subtotalCents, currency: "USD" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Shipping</span>
                  <span className="font-mono">{formatMoney({ amount: shippingCents, currency: "USD" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-secondary">Tax</span>
                  <span className="font-mono">{formatMoney({ amount: taxCents, currency: "USD" })}</span>
                </div>
              </div>
              <div className="border-t border-border-subtle pt-3 flex justify-between items-baseline">
                <span className="font-display uppercase tracking-wide">Total</span>
                <span className="font-display text-2xl">
                  {formatMoney({ amount: totalCents, currency: "USD" })}
                </span>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}

function StepCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-secondary border border-border-subtle p-6">
      <h2 className="font-display text-xl uppercase tracking-widest mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  className = "",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow block mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <input
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </label>
  );
}
