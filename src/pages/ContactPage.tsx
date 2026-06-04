import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useStoreInfo } from "@/hooks/useApi";

export function ContactPage() {
  const { data: store } = useStoreInfo();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <>
      <Helmet>
        <title>Contact — DU$TY</title>
      </Helmet>
      <section className="container-x py-12 md:py-20">
        <header className="text-center mb-12">
          <p className="eyebrow mb-3">Get in touch</p>
          <h1 className="heading-display text-5xl md:text-7xl text-balance">
            Contact
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-bg-secondary border border-border-default p-8 text-center">
                <p className="eyebrow text-success mb-2">Sent</p>
                <h2 className="font-display text-2xl uppercase tracking-wide mb-3">
                  Message received
                </h2>
                <p className="text-fg-secondary">
                  We'll get back to you within 2-3 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary mt-6"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="eyebrow block mb-2">Name</label>
                  <input type="text" required className="input" />
                </div>
                <div>
                  <label className="eyebrow block mb-2">Email</label>
                  <input type="email" required className="input" />
                </div>
                <div>
                  <label className="eyebrow block mb-2">Subject</label>
                  <select className="input">
                    <option>General Inquiry</option>
                    <option>Booking</option>
                    <option>Press / Media</option>
                    <option>Wholesale / Collab</option>
                    <option>Customer Support</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow block mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    className="input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full"
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-bg-secondary border border-border-subtle p-6">
              <h3 className="eyebrow mb-3">Support</h3>
              <p className="text-fg-secondary text-sm leading-relaxed mb-3">
                For order questions, sizing, returns, and general support.
              </p>
              {store?.contactEmail && (
                <a
                  href={`mailto:${store.contactEmail}`}
                  className="font-mono text-accent hover:underline break-all"
                >
                  {store.contactEmail}
                </a>
              )}
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-6">
              <h3 className="eyebrow mb-3">Booking & Press</h3>
              <p className="text-fg-secondary text-sm leading-relaxed">
                For bookings, press inquiries, features, and interview requests,
                use the form and select "Booking" or "Press" as the subject.
              </p>
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-6">
              <h3 className="eyebrow mb-3">Response Time</h3>
              <p className="text-fg-secondary text-sm leading-relaxed">
                We typically respond within 2-3 business days. For urgent booking
                inquiries, reach out on Instagram DM.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
