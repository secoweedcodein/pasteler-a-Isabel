import { createFileRoute, redirect } from "@tanstack/react-router";

// The site itself is a static HTML/CSS/JS project in public/isabel (GitHub Pages ready).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Isabel Pastelería · Colbún" },
      { name: "description", content: "Pastelería, amasandería y eventos en Colbún, Chile." },
      { property: "og:title", content: "Isabel Pastelería · Colbún" },
      { property: "og:description", content: "Dulces momentos, hechos con amor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/isabel/index.html" });
  },
});
