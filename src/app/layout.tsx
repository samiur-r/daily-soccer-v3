import "./globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Script from "next/script";

const inter = Oswald({ subsets: ["latin"] });

const APP_NAME = "DondeLoDan";
const APP_DEFAULT_TITLE = "Próximos Partidos de Fútbol: Canales y Plataformas de Streaming | Dónde lo dan";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Encuentra dónde ver tus partidos de fútbol favoritos. Consulta en qué canal y plataforma de streaming se transmiten los encuentros más esperados. ¡Mantente siempre informado!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
