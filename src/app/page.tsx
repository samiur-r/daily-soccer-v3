import MatchList from "@/components/MatchList";
import { fetchMatches } from "@/services/macthes";


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

  return <MatchList matches={matches} totalItems={totalItems} />;
}
