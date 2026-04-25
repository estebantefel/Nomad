import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nomad — Discover Madrid",
  description:
    "Nomad turns Madrid into your game. New experiences every week, streaks with friends, and the best the city has to offer.",
  openGraph: {
    title: "Nomad — Discover Madrid",
    description:
      "Nomad turns Madrid into your game. New experiences every week, streaks with friends, and the best the city has to offer.",
    images: ["/og-home.png"],
  },
  alternates: {
    canonical: "https://nomad.es",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
