import MatchList from "@/components/MatchList";
import RightMenu from "@/components/RightMenu";
import { fetchMatches } from "@/services/matches";

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
    <div className="flex gap-7">
      <div className="flex-1">
        <MatchList matches={matches} totalItems={totalItems} />
      </div>
      <div className="flex-initial w-72">
        <RightMenu />
      </div>
    </div>
  );
}
