import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thechnnl.com"),
  title: { default: "The Chnnl | The Business Behind the Creator Economy", template: "%s | The Chnnl" },
  description: "The Chnnl covers creators, TikTok Shop, social commerce, brands, platforms and the businesses shaping the creator economy.",
  openGraph: { type: "website", siteName: "The Chnnl", title: "The Chnnl | The Business Behind the Creator Economy", description: "Creators, companies, platforms and money shaping the new media economy.", images: [{ url: "/og.png", width: 1792, height: 922, alt: "The Chnnl — The business behind the creator economy" }] },
  twitter: { card: "summary_large_image", title: "The Chnnl", description: "The business behind the creator economy.", images: ["/og.png"] },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body>
    </html>
  );
}
