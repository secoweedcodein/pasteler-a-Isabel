import { createFileRoute, redirect } from "@tanstack/react-router";

// /isabel (without trailing slash or filename) should open the static site too.
export const Route = createFileRoute("/isabel")({
  beforeLoad: () => {
    throw redirect({ href: "/isabel/index.html" });
  },
});
