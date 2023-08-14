import type { Metadata } from "next";

import { fetchCompetitionMatches } from "@/services/matches";
import MatchList from "@/components/MatchList";
import { fetchCompetition } from "@/services/competitions";
import RightMenu from "@/components/RightMenu";
import { categorizeMatchesByDate } from "@/utils/matches";

const getCompetitionMatches = async (competition_name: string) => {
  try {
    const { matches, totalItems } = await fetchCompetitionMatches(
      competition_name.replace(/_/g, " "),
      1
    );
    const categorizedMatches = Object.entries(categorizeMatchesByDate(matches));
    return { matches, totalItems, categorizedMatches };
  } catch (error: any) {
    console.log(error);
  }
};

type CompetitionMatchesProps = {
  params: { competition_name: string };
};

export async function generateMetadata({
  params,
}: CompetitionMatchesProps): Promise<Metadata> {
  const competition_name = params.competition_name.replace(/_/g, " ");

  return {
    title: `Partidos de ${competition_name}`,
    description: `Partidos de ${competition_name}`,
  };
}

const CompetitionMatches = async ({
  params,
}: {
  params: { competition_name: string };
}) => {
  const { matches, totalItems, categorizedMatches }: any = await getCompetitionMatches(
    params.competition_name
  );
  const competition = await fetchCompetition(
    params.competition_name.replace(/_/g, " ")
  );

  return (
    <div className="flex gap-7">
      <div className="flex-1">
        <MatchList
          matches={matches}
          totalItems={totalItems}
          categorizedMatches={categorizedMatches}
          title={competition ? competition.Name.replace(/_/g, " ") : null}
          titleImage={competition ? competition.Image : null}
        />
      </div>
      <div className="flex-initial w-72 hidden xl:block">
        <RightMenu
          headline={competition ? competition.Name.replace(/_/g, " ") : null}
        />
      </div>
    </div>
  );
};

export default CompetitionMatches;
