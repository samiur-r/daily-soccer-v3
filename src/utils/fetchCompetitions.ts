import { CompetitionType } from "@/types/competition";

const fetchCompetitions = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_COMPETITIONS_URL as string, {
    next: {
      revalidate: 60,
    },
  });
  const competitions = await res.json();
  const parsedCompetitions = parseCompetitions(competitions);

  return parsedCompetitions;
};

const parseCompetitions = (
  competitions: Array<{ Competition: CompetitionType }>
) => {
  const parsedCompetitions = competitions.reduce((unique: any, current) => {
    const { Id, Name, Image } = current.Competition;

    const exists = unique.some((item: { Id: string }) => item.Id === Id);

    if (!exists) unique.push({ Id, Name, Image });
    return unique;
  }, []);

  return parsedCompetitions;
};

export default fetchCompetitions;
