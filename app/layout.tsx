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
  title: "Nomad — Descubre Madrid",
  description:
    "Nomad convierte Madrid en tu juego. Nuevas experiencias cada semana, rachas con amigos y el mejor plan de la ciudad esperándote.",
  openGraph: {
    title: "Nomad — Descubre Madrid",
    description:
      "Nomad convierte Madrid en tu juego. Nuevas experiencias cada semana, rachas con amigos y el mejor plan de la ciudad esperándote.",
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
      lang="es"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
