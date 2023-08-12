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

export { fetchCompetitions };
