import type { Metadata } from "next";
import { fetchCompetitionMatches } from "@/services/macthes";
import MatchList from "@/components/MatchList";

const getCompetitionMatches = async (competition_name: string) => {
  try {
    const response = await fetchCompetitionMatches(
      competition_name.replace(/_/g, " "),
      1
    );
    return response;
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
  const { matches, totalItems }: any = await getCompetitionMatches(
    params.competition_name
  );
  return <MatchList matches={matches} totalItems={totalItems} />;
};

export default CompetitionMatches;
