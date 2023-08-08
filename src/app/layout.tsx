import "./globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";

const inter = Oswald({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Próximos Partidos de Fútbol: Canales y Plataformas de Streaming | Dónde lo dan",
  description: "Encuentra dónde ver tus partidos de fútbol favoritos. Consulta en qué canal y plataforma de streaming se transmiten los encuentros más esperados. ¡Mantente siempre informado!",
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
