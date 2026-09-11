import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const fraunces = Fraunces({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Manato Entertainments stages themed live music evenings — one composer or pairing, twenty to thirty songs, sung live by hand-picked singers. Grand stages, golden memories.",
  openGraph: {
    description:
      "One theme. One night. Every song, live. Themed tribute evenings built around composers like Ilaiyaraaja, A. R. Rahman and Koti.",
    title: "Manato Entertainments — Themed Live Music Nights",
    type: "website",
  },
  title: "Manato Entertainments — Themed Live Music Nights",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      lang="en"
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
              strategy="beforeInteractive"
            />
          </>
        )}
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
