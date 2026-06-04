export function PrivacyPage() {
  return (
    <div className="space-y-4 text-fg-secondary leading-relaxed">
      <h1 className="heading-display text-4xl md:text-5xl mb-6">Privacy Policy</h1>
      <p className="text-sm text-fg-tertiary">Last updated: 2026-06-03</p>
      <p>
        DTR Brand LLC ("we," "us," or "our") operates the DU$TY online store.
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal information.
      </p>
      <h2 className="heading-display text-2xl mt-8 mb-3">Information We Collect</h2>
      <p>
        We collect information you provide directly: name, email, shipping
        address, and payment information (processed by our payment provider — we
        do not store full card numbers).
      </p>
      <h2 className="heading-display text-2xl mt-8 mb-3">How We Use It</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Process and ship your orders</li>
        <li>Send order updates and tracking</li>
        <li>With your consent, marketing emails (you can unsubscribe anytime)</li>
        <li>Improve our products and services</li>
      </ul>
      <h2 className="heading-display text-2xl mt-8 mb-3">Contact</h2>
      <p>
        Questions? Email{" "}
        <a href="mailto:privacy@dtrbrand.com" className="text-accent hover:underline">
          privacy@dtrbrand.com
        </a>
        .
      </p>
    </div>
  );
}
