import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pokemontcg.io" },
      { hostname: "images.scrydex.com" },
      { hostname: "tcgplayer-cdn.tcgplayer.com" },
      { hostname: "public.getcollectr.com" },
      { hostname: "i.ebayimg.com" },
    ],
  },
};

export default nextConfig;
