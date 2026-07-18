import type { Metadata } from "next";
import { Bodoni_Moda, PT_Serif, Jost } from "next/font/google";
import "./globals.css";
import React from "react";
import MagazineHeader from "@/components/MagazineHeader";
import SiteFooter from "@/components/SiteFooter";
import { profile, thesis } from "@/data/resume";

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const ptSerif = PT_Serif({
  variable: "--font-body",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// 400/500/600 gives real hierarchy in labels without reaching for bold.
const jost = Jost({
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // GitHub Pages origin — resolves relative og:image URLs.
  metadataBase: new URL("https://airjan-airlines.github.io"),
  title: {
    default: `${profile.name}, ${profile.degree} at ${profile.school}`,
    template: `%s | ${profile.name}`,
  },
  description: thesis,
  openGraph: {
    title: profile.name,
    description: thesis,
    type: "website",
    images: ["/arjun_image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: thesis,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${ptSerif.variable} ${jost.variable} grain antialiased bg-base text-ink`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/*
          Nothing may show outside the trim. These bands cover only the margin
          between the viewport edge and the red rule (8px, 16px at md), so
          scrolling text is clipped exactly at the border and the content area
          itself is untouched.
        */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-30 h-2 md:h-4 bg-base"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-2 md:h-4 bg-base"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-y-0 left-0 z-30 w-2 md:w-4 bg-base"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-y-0 right-0 z-30 w-2 md:w-4 bg-base"
        />

        {/* The magazine trim. A hairline reads more considered than a 4px slab. */}
        <div
          aria-hidden
          className="fixed inset-2 md:inset-4 border border-accent/70 pointer-events-none z-40"
        />

        <MagazineHeader />

        {/* Normal document flow — the page scrolls, not an inner div. */}
        <main
          id="main"
          className="relative z-10 px-6 md:px-14 lg:px-20 pt-28 md:pt-36 pb-24 md:pb-32"
        >
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
