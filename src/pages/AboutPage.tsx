import { Helmet } from "react-helmet-async";
import { useContentPage } from "@/hooks/useApi";
import type { ContentBlock } from "@/types/domain";

export function AboutPage() {
  const { data: page } = useContentPage("about");

  return (
    <>
      <Helmet>
        <title>About — DU$TY</title>
        <meta
          name="description"
          content="Houston-bred, Atlanta-based, Haitian descent. The DTR code. A brand, not a rapper."
        />
      </Helmet>

      <article className="container-narrow py-12 md:py-20">
        {page ? (
          page.blocks.map((block, i) => <BlockRenderer key={i} block={block} />)
        ) : (
          <p className="text-fg-secondary">Loading…</p>
        )}

        <hr className="my-16 border-border-subtle" />

        <section className="space-y-6">
          <h2 className="heading-display text-3xl">The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "HOMETOWN", v: "Houston, TX" },
              { k: "BASED", v: "Atlanta, GA" },
              { k: "ROOTS", v: "Haiti 🇭🇹" },
              { k: "CODE", v: "DUSTY BOIS" },
            ].map((s) => (
              <div key={s.k} className="bg-bg-secondary p-4 border border-border-subtle">
                <p className="eyebrow mb-1">{s.k}</p>
                <p className="font-display text-xl uppercase tracking-wide">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading": {
      const className =
        block.level === 1
          ? "heading-display text-5xl md:text-7xl mb-6 text-balance"
          : block.level === 2
            ? "heading-display text-3xl md:text-4xl mt-12 mb-4"
            : "heading-display text-xl md:text-2xl mt-8 mb-3";
      return <h2 className={className}>{block.text}</h2>;
    }
    case "paragraph":
      return (
        <p className="text-lg text-fg-secondary leading-relaxed mb-6 text-pretty">
          {block.text}
        </p>
      );
    case "image":
      return (
        <figure className="my-8">
          <img
            src={block.url}
            alt={block.alt}
            className="w-full border border-border-subtle"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-2xs text-fg-tertiary mt-2 uppercase tracking-wide">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-accent pl-6 my-8">
          <p className="font-display text-2xl md:text-3xl leading-tight text-balance">
            "{block.text}"
          </p>
          {block.attribution && (
            <footer className="eyebrow mt-3">— {block.attribution}</footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-2 my-6">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-lg text-fg-secondary"
            >
              <span className="text-accent">◆</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "embed":
      return (
        <div className="my-8">
          {block.title && <p className="eyebrow mb-2">{block.title}</p>}
          <div className="aspect-video bg-bg-elevated border border-border-subtle">
            <iframe
              src={block.url}
              title={block.title ?? `${block.provider} embed`}
              className="w-full h-full"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}
