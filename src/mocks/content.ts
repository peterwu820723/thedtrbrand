/**
 * CMS-style content (mock).
 * In production this comes from Xavvi /content/pages, but for v1 we
 * keep it versioned in the repo for review control.
 */

import type { ContentPage } from "@/types/domain";

export const mockContentPages: ContentPage[] = [
  // ================================================================
  {
    slug: "about",
    title: "About DU$TY",
    blocks: [
      {
        type: "heading",
        level: 1,
        text: "DU$TY",
      },
      {
        type: "paragraph",
        text: "Houston-bred. Atlanta-based. Haitian descent. A brand, not a rapper. DTR — Dusty the Rapper. Down to Ride.",
      },
      {
        type: "image",
        url: "https://placehold.co/1200x800/1F2128/FF6B1A?text=DU%24TY+PORTRAIT",
        alt: "DU$TY portrait",
        caption: "Think Smart, Be Smart.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Brand",
      },
      {
        type: "paragraph",
        text: "DTR isn't just a name. It's a code. The all-seeing eye. The chain. The hustle. Every piece of merch is built to last, to be lived in, to be worn with intent.",
      },
      {
        type: "quote",
        text: "A brand, not a rapper. That's the difference. I'm building something that outlives a single song.",
        attribution: "DU$TY",
      },
      {
        type: "heading",
        level: 2,
        text: "The Roots",
      },
      {
        type: "list",
        items: [
          "Houston, TX — where it started",
          "Haiti — the blood, the heritage, the pride",
          "Atlanta, GA — where the brand grew up",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The Code",
      },
      {
        type: "list",
        items: [
          "Think Smart, Be Smart",
          "Cool Cool, Smart Smart",
          "Down to Ride",
          "Cash Only",
          "DUSTY BOIS for life",
        ],
      },
    ],
  },

  // ================================================================
  {
    slug: "tour",
    title: "Tour",
    blocks: [
      {
        type: "heading",
        level: 1,
        text: "On The Road",
      },
      {
        type: "paragraph",
        text: "Catch DU$TY live. Dates added as they're locked in. Tickets and VIP via the links below.",
      },
      // Static placeholder — in production this would be dynamic from an events endpoint
    ],
  },

  // ================================================================
  {
    slug: "contact",
    title: "Contact",
    blocks: [
      {
        type: "heading",
        level: 1,
        text: "Get In Touch",
      },
      {
        type: "paragraph",
        text: "Booking inquiries, press, wholesale, collabs, or just saying what's up. Use the form and we'll get back to you.",
      },
    ],
  },
];
