import "./globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";

const inter = Oswald({ subsets: ["latin"] });

const APP_NAME = "DondeLoDan";
const APP_DEFAULT_TITLE = "Próximos Partidos de Fútbol: Canales y Plataformas de Streaming | Dónde lo dan";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Encuentra dónde ver tus partidos de fútbol favoritos. Consulta en qué canal y plataforma de streaming se transmiten los encuentros más esperados. ¡Mantente siempre informado!";
const APP_IMAGE = "https://www.dondelodan.com/social/dondelodan.png";

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
    url: "https://www.dondelodan.com",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: APP_IMAGE
  },
  twitter: {
    card: "summary",
    site: "@dondelodan",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: APP_IMAGE
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
        <link rel="canonical" href="https://www.dondelodan.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
