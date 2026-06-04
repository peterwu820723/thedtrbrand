export function ReturnsPolicyPage() {
  return (
    <div className="space-y-4 text-fg-secondary leading-relaxed">
      <h1 className="heading-display text-4xl md:text-5xl mb-6">Returns Policy</h1>
      <p className="text-sm text-fg-tertiary">Last updated: 2026-06-03</p>
      <h2 className="heading-display text-2xl mt-8 mb-3">30-Day Returns</h2>
      <p>
        Unworn, unwashed items with original tags can be returned within 30 days
        of delivery for a full refund.
      </p>
      <h2 className="heading-display text-2xl mt-8 mb-3">How to Return</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Email returns@dtrbrand.com with your order number</li>
        <li>We'll send you a return label</li>
        <li>Ship the item back in original packaging</li>
        <li>Refund issued within 5-7 business days of receipt</li>
      </ol>
      <h2 className="heading-display text-2xl mt-8 mb-3">Final Sale</h2>
      <p>
        Limited drops, custom items, and sale items marked as final sale are not
        eligible for return or exchange.
      </p>
    </div>
  );
}
