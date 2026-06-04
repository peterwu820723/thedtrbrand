import { Helmet } from "react-helmet-async";
import { useStoreInfo } from "@/hooks/useApi";

const tracks = [
  {
    title: "DU$TY ON THE RISE",
    artist: "DTR",
    embed: "https://open.spotify.com/embed/track/4Aa8wBhDX4nKEv1nyLxlf2?utm_source=generator&theme=0",
  },
];

const videos = [
  {
    title: "Official Visual",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", // placeholder
  },
];

export function MusicPage() {
  const { data: store } = useStoreInfo();

  return (
    <>
      <Helmet>
        <title>Music — DU$TY</title>
        <meta
          name="description"
          content="Listen to DU$TY on Spotify, Apple Music, YouTube, SoundCloud, and Tidal."
        />
      </Helmet>

      <section className="container-x py-12 md:py-20">
        <header className="text-center mb-12">
          <p className="eyebrow mb-3">Music</p>
          <h1 className="heading-display text-5xl md:text-7xl text-balance">
            Listen to the brand
          </h1>
          <p className="text-fg-secondary mt-3 max-w-xl mx-auto">
            Latest tracks, videos, and full discography. Stream on your platform of choice.
          </p>
        </header>

        {/* Featured track */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="eyebrow mb-3">Now Playing</h2>
          {tracks.map((t) => (
            <div
              key={t.title}
              className="bg-bg-secondary border border-border-subtle p-4"
            >
              <p className="font-display text-2xl uppercase tracking-wide mb-3">
                {t.title}
              </p>
              <iframe
                title={`${t.title} - Spotify`}
                src={t.embed}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Videos */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="eyebrow mb-3">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((v) => (
              <div
                key={v.title}
                className="bg-bg-secondary border border-border-subtle aspect-video overflow-hidden"
              >
                <iframe
                  title={v.title}
                  src={v.embed}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Streaming links */}
        <section className="max-w-3xl mx-auto text-center bg-bg-secondary border border-border-subtle p-8">
          <h2 className="font-display text-3xl uppercase tracking-widest mb-3">
            Stream Everywhere
          </h2>
          <p className="text-fg-secondary mb-6">
            Pick your platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {store?.socialLinks?.spotify && (
              <a
                href={store.socialLinks.spotify}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Spotify →
              </a>
            )}
            {store?.socialLinks?.youtube && (
              <a
                href={store.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                YouTube →
              </a>
            )}
            {store?.socialLinks?.soundcloud && (
              <a
                href={store.socialLinks.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                SoundCloud →
              </a>
            )}
            {store?.socialLinks?.tiktok && (
              <a
                href={store.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                TikTok →
              </a>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
