import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import Script from "next/script";

import { LazyMotionProvider } from "@/components/lazy-motion-provider";
import { Toaster } from "@/components/toast";

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

export const metadata: Metadata = {
  description:
    "Concerts, corporate events, celebrations and brand activations. MANATO creates experiences that connect people.",
  metadataBase: new URL("https://www.manatoentertainments.com/"),
  openGraph: {
    description:
      "Grand Stages. Golden Memories. Concerts, corporate events and brand experiences by MANATO Entertainments.",
    images: [
      {
        alt: "MANATO Entertainments — Grand Stages | Golden Memories",
        height: 630,
        type: "image/png",
        url: "/assets/manato-og.png",
        width: 1200,
      },
    ],
    siteName: "MANATO Entertainments",
    title: "MANATO Entertainments | Where Entertainment Meets Experience",
    type: "website",
  },
  title: "MANATO Entertainments | Events & Entertainment",
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#010f29",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${fraunces.variable} ${geistSans.variable} h-full antialiased`}
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
      <body className="flex min-h-full flex-col">
        <LazyMotionProvider>{children}</LazyMotionProvider>
        <Toaster />
      </body>
    </html>
  );
}
