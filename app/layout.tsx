import type { Metadata, Viewport } from "next";
import { inter, geistMono, clashDisplay } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { LenisProvider } from "@/providers/LenisProvider";
import { CustomCursor } from "@/components/common/CustomCursor";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@tanmay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${clashDisplay.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text-primary antialiased overflow-x-hidden">
        <LenisProvider>
          <LoadingScreen />
          <CustomCursor />
          <div className="noise-overlay" aria-hidden="true" />
          <main id="main-content">{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(8, 8, 15, 0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f0f0ff",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
