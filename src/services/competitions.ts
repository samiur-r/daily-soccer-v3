import { parseCompetitions } from "@/utils/competitions";

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

const fetchCompetition = async (competition_name: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_COMPETITIONS_URL as string, {
    next: {
      revalidate: 60,
    },
  });
  const competitions = await res.json();

  return (
    competitions.find(
      (competition: { Competition: { Name: string } }) =>
        competition.Competition.Name === competition_name
    ).Competition || null
  );
};

export { fetchCompetitions, fetchCompetition };
