import type { Metadata } from "next";

type CompetitionMatchesProps = {
  params: { competition_name: string };
};

export async function generateMetadata({
  params,
}: CompetitionMatchesProps): Promise<Metadata> {
  const competition_name = params.competition_name.replace(/_/g, " ");

  return {
    title: competition_name,
  };
}

const CompetitionMatches = ({
  params,
}: {
  params: { competition_name: string };
}) => {
  return <h1>{params.competition_name}</h1>;
};

export default CompetitionMatches;
