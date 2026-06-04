export function ShippingPolicyPage() {
  return (
    <div className="space-y-4 text-fg-secondary leading-relaxed">
      <h1 className="heading-display text-4xl md:text-5xl mb-6">Shipping Policy</h1>
      <p className="text-sm text-fg-tertiary">Last updated: 2026-06-03</p>
      <h2 className="heading-display text-2xl mt-8 mb-3">Processing Time</h2>
      <p>
        Orders are processed within 1-2 business days. You'll receive a
        confirmation email with tracking once your order ships.
      </p>
      <h2 className="heading-display text-2xl mt-8 mb-3">Domestic (US)</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Standard: 5-8 business days — $7.95</li>
        <li>Express: 2-3 business days — $14.95</li>
        <li>Free standard shipping on orders $150+</li>
      </ul>
      <h2 className="heading-display text-2xl mt-8 mb-3">International</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Standard: 10-20 business days — $19.95</li>
        <li>Caribbean / Haiti: 7-14 business days — $24.95</li>
      </ul>
      <p className="mt-4">
        Customs duties and taxes are the responsibility of the recipient.
      </p>
    </div>
  );
}
