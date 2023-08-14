import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import Menu from "@/components/Menu";
import { fetchCompetitions } from "@/services/competitions";
import RightMenu from "@/components/RightMenu";

const roboto_c = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const APP_NAME = "DondeLoDan";
const APP_DEFAULT_TITLE =
  "Próximos Partidos de Fútbol: Canales y Plataformas de Streaming | Dónde lo dan";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION =
  "Encuentra dónde ver tus partidos de fútbol favoritos. Consulta en qué canal y plataforma de streaming se transmiten los encuentros más esperados. ¡Mantente siempre informado!";
const APP_IMAGE = "https://www.dondelodan.com/social/dondelodan.png";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  metadataBase: new URL("https://www.dondelodan.com"),
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
    images: APP_IMAGE,
  },
  twitter: {
    card: "summary",
    site: "@dondelodantv",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: APP_IMAGE,
  },
};

const getCompetitions = async () => {
  try {
    const response = await fetchCompetitions();
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const competitions = await getCompetitions();
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://www.dondelodan.com" />
      </head>
      <body className={roboto_c.className}>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="py-6 bg-gray-200">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
              <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                <Menu competitions={competitions} />
              </div>
              {/* <main className="lg:col-span-9 xl:col-span-10">{children}</main> */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
