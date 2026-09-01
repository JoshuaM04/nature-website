import type { NextConfig } from "next";

/* Standalone output is for self-hosting: it emits a server carrying only the
   dependencies actually reached, which is what the container copies instead of
   the whole node_modules. Vercel does its own file tracing and expects the
   trace files where standalone mode does not leave them, so the option is set
   everywhere except there. */
const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
};

export default nextConfig;
