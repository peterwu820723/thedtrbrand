import { Helmet } from "react-helmet-async";

// Static tour dates (in production this would come from an events endpoint)
const shows = [
  {
    date: "2026-07-18",
    city: "Houston, TX",
    venue: "Warehouse Live",
    status: "On Sale",
    ticketUrl: "https://example.com/tickets/houston",
  },
  {
    date: "2026-07-25",
    city: "Atlanta, GA",
    venue: "The Masquerade",
    status: "On Sale",
    ticketUrl: "https://example.com/tickets/atlanta",
  },
  {
    date: "2026-08-02",
    city: "Miami, FL",
    venue: "LIV",
    status: "On Sale",
    ticketUrl: "https://example.com/tickets/miami",
  },
  {
    date: "2026-08-15",
    city: "Brooklyn, NY",
    venue: "Knockdown Center",
    status: "On Sale",
    ticketUrl: "https://example.com/tickets/brooklyn",
  },
  {
    date: "2026-09-05",
    city: "Port-au-Prince, Haiti",
    venue: "Karibe Hotel",
    status: "Coming Soon",
    ticketUrl: "#",
  },
  {
    date: "2026-09-20",
    city: "Los Angeles, CA",
    venue: "The Regent",
    status: "Sold Out",
    ticketUrl: "#",
  },
];

export function TourPage() {
  return (
    <>
      <Helmet>
        <title>Tour — DU$TY</title>
        <meta
          name="description"
          content="Catch DU$TY live. Tour dates, venues, and tickets."
        />
      </Helmet>

      <section className="container-x py-12 md:py-20">
        <header className="mb-12">
          <p className="eyebrow mb-3">On The Road</p>
          <h1 className="heading-display text-5xl md:text-7xl text-balance">
            Tour
          </h1>
        </header>

        <div className="bg-bg-secondary border border-border-subtle">
          <ul>
            {shows.map((s, i) => {
              const d = new Date(s.date);
              const month = d.toLocaleDateString("en-US", { month: "short" });
              const day = d.getDate();
              return (
                <li
                  key={i}
                  className={`grid grid-cols-12 gap-4 items-center px-4 md:px-6 py-5
                    ${i !== 0 ? "border-t border-border-subtle" : ""}
                    hover:bg-bg-elevated transition-colors`}
                >
                  <div className="col-span-3 md:col-span-2">
                    <p className="font-display text-3xl md:text-4xl text-accent leading-none">
                      {day}
                    </p>
                    <p className="eyebrow mt-1">{month} {d.getFullYear()}</p>
                  </div>
                  <div className="col-span-9 md:col-span-7">
                    <p className="font-display text-xl md:text-2xl uppercase tracking-wide">
                      {s.city}
                    </p>
                    <p className="text-sm text-fg-secondary">{s.venue}</p>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:text-right">
                    {s.status === "Sold Out" ? (
                      <span className="inline-block text-2xs uppercase tracking-widest text-fg-tertiary">
                        Sold Out
                      </span>
                    ) : s.status === "Coming Soon" ? (
                      <span className="tag">Coming Soon</span>
                    ) : (
                      <a
                        href={s.ticketUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                      >
                        Get Tickets →
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-sm text-fg-tertiary mt-6 text-center">
          More dates added regularly. Follow on Instagram for first access.
        </p>
      </section>
    </>
  );
}
