import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "FSquaro | Jewellery for Every Story",
  description:
    "Discover FSquaro fashion jewellery and accessories for everyday style and special moments.",
  icons: {
    icon: "/brand/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "FSquaro | Jewellery for Every Story",
    description:
      "Discover FSquaro fashion jewellery and accessories for everyday style and special moments.",
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
