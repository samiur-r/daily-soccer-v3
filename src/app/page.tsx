import MatchList from "@/components/MatchList";
import RightMenu from "@/components/RightMenu";
import { fetchMatches } from "@/services/matches";
import { categorizeMatchesByDate } from "@/utils/matches";

const getMatches = async () => {
  try {
    const { matches, totalItems } = await fetchMatches(1);
    const categorizedMatches = Object.entries(categorizeMatchesByDate(matches));
    return { matches, totalItems, categorizedMatches };
  } catch (error: any) {
    console.log(error);
  }
};

export default async function Home() {
  const { matches, totalItems, categorizedMatches }: any = await getMatches();

  return (
    <div className="flex gap-7">
      <div className="flex-1">
        <MatchList
          matches={matches}
          totalItems={totalItems}
          categorizedMatches={categorizedMatches}
        />
      </div>
      <div className="flex-initial w-72 hidden xl:block">
        <RightMenu />
      </div>
    </div>
  );
}
