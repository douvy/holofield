import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holofield - Pokémon Card Art Database",
  description: "Discover cameos, perspectives, and hidden details in Pokémon TCG art.",
  metadataBase: new URL("https://holofield.io"),
  openGraph: {
    title: "Holofield",
    description: "Discover cameos, perspectives, and hidden details in Pokémon TCG art.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holofield",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
