import { createFileRoute, redirect } from "@tanstack/react-router";

// /index is a common bookmark/typed URL; send it to the static site like / does.
export const Route = createFileRoute("/index/")({
  beforeLoad: () => {
    throw redirect({ href: "/isabel/index.html" });
  },
});
