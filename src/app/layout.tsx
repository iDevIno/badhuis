import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Huisartsenpraktijk Badhuis", template: "%s | Huisartsenpraktijk Badhuis" },
  description: "Huisartsenpraktijk Badhuis in Sint-Andries, Antwerpen.",
  alternates: { canonical: "/" },
  openGraph: { title: "Huisartsenpraktijk Badhuis", description: "Huisartsenpraktijk in Sint-Andries, Antwerpen.", url: "/", siteName: "Huisartsenpraktijk Badhuis", locale: "nl_BE", type: "website" },
  twitter: { card: "summary_large_image", title: "Huisartsenpraktijk Badhuis", description: "Huisartsenpraktijk in Sint-Andries, Antwerpen." },
};

export const viewport: Viewport = { themeColor: "#506b5a", colorScheme: "light" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
