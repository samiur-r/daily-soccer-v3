import MatchList from "@/components/MatchList";
import fetchMatches from "@/utils/fetchMatches";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import fetchCompetitions from "@/utils/fetchCompetitions";

const getMatches = async () => {
  try {
    const response = await fetchMatches(1);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

const getCompetitions = async () => {
  try {
    const response = await fetchCompetitions();
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export default async function Home() {
  const { matches, totalItems }: any = await getMatches();
  const competitions = await getCompetitions()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-6 bg-gray-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <Menu competitions={competitions} />
          </div>
          <main className="lg:col-span-9 xl:col-span-7">
            <MatchList matches={matches} totalItems={totalItems} />
          </main>
          <aside className="hidden xl:col-span-3 xl:block">
            <div className="sticky top-24 space-y-4 border-l-4 border-emerald-700 ps-4">
              <h1 className="font-medium">¿Dónde lo dan? Encuentra Dónde Verlo: Próximos Partidos de Fútbol en Canales y Plataformas de Streaming.</h1>
              <a href="https://x.com/dondelodantv" target="_blank" rel="noreferrer">Twitter</a>
              <p>Contacto: hola@dondelodan.com</p>
              <p>©2023 dondelodan.com</p>
            </div>
          </aside>
        </div>
      </div>

    </div>
  );
}
