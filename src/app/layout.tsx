import "./globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";

const inter = Oswald({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Donde lo dan",
  description: "Donde dan los partidos de fútbol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
