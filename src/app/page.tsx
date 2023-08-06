import MatchList from "@/components/MatchList";
import fetchMatches from "@/utils/fetchMatches";

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
    <main className="flex justify-center min-h-screen py-10 m-3">
      <MatchList matches={matches} totalItems={totalItems} />
    </main>
  );
}
