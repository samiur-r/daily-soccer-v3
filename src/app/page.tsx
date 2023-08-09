import MatchList from "@/components/MatchList";
import fetchMatches from "@/utils/fetchMatches";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

const getMatches = async () => {
  try {
    const response = await fetchMatches(1);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export default async function Home() {
  const { matches, totalItems }: any = await getMatches();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="py-6 bg-gray-200">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <Menu />
          </div>
          <main className="lg:col-span-9 xl:col-span-7">
            <MatchList matches={matches} totalItems={totalItems} />
          </main>
          <aside className="hidden xl:col-span-3 xl:block">
            <div className="sticky top-24 space-y-4">
              sidebar
            </div>
          </aside>
        </div>
      </div>

    </div>
  );
}
