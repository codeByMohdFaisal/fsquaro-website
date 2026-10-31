import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "FSquaro | More for Everyday Life",
  description:
    "Discover FSquaro's growing range of products for everyday needs, interests, and moments.",
  icons: {
    icon: "/brand/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "FSquaro | More for Everyday Life",
    description:
      "Discover FSquaro's growing range of products for everyday needs, interests, and moments.",
    images: ["/brand/og-image-1200x630.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
