import { Metadata, Viewport } from "next";

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export const constructMetadata = ({
  title = "Next.js Starter",
  description = "A premium Next.js starter template for production apps.",
  image = "/og-image.png", // Make sure to add this file to public/
  noIndex = false,
}: SeoOptions = {}): Metadata => {
  return {
    title: {
      template: "%s | Next.js Starter",
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yourhandle",
    },
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};

export const constructViewport = (): Viewport => {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  };
};
