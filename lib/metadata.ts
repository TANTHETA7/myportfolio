import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata(
  options: {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
  } = {}
): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = "",
    image = siteConfig.ogImage,
    noIndex = false,
  } = options;

  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.title}`;

  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords],
    authors: [...siteConfig.authors],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@tanmay",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
  };
}
