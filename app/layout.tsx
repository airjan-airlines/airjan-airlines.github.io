import type { Metadata } from "next";
import { Bodoni_Moda, PT_Serif, Jost } from "next/font/google";
import "./globals.css";
import React from "react";
import MagazineHeader from "@/components/MagazineHeader";

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-body",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arjun Desikan",
  description: "Personal Website & Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${ptSerif.variable} ${jost.variable} antialiased bg-base text-ink overflow-hidden`}
      >
        <div className="bg-grain fixed inset-0 pointer-events-none z-50"></div>
        
        {/* The Magazine Border */}
        <div className="fixed inset-2 md:inset-4 border-2 md:border-4 border-time-red pointer-events-none z-40"></div>
        
        <MagazineHeader />

        {/* Main Content Area — scrolls inside the red border */}
        <div className="fixed inset-[10px] md:inset-[20px] z-10 overflow-y-auto px-6 md:px-12 py-32 md:py-40">
          {children}
        </div>
      </body>
    </html>
  );
}
