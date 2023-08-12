import { CompetitionType } from "@/types/competition";

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

export { parseCompetitions };
