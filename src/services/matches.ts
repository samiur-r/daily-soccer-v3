import {
  filterActiveMatches,
  filterMatchesByCompetition,
  filterMatchesBySearchVal,
} from "@/utils/matches";

const fetchMatches = async (page: number) => {
  const res = await fetch(process.env.NEXT_PUBLIC_MATCHES_URL as string, {
    next: {
      revalidate: 60,
    },
  });
  const matches = await res.json();
  const filteredMatches = filterActiveMatches(matches);
  const totalItems = filteredMatches.length;

  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 20;
  const paginatedData: any = filteredMatches.slice(startIdx, endIdx);

  return { matches: paginatedData, totalItems };
};

const fetchCompetitionMatches = async (
  competition_name: string,
  page: number
) => {
  const res = await fetch(process.env.NEXT_PUBLIC_MATCHES_URL as string);
  const matches = await res.json();
  const filteredMatches = filterMatchesByCompetition(matches, competition_name);
  const totalItems = filteredMatches.length;

  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 20;
  const paginatedData: any = filteredMatches.slice(startIdx, endIdx);

  return { matches: paginatedData, totalItems };
};

const searchMatches = async (search: string, page: number) => {
  const res = await fetch(process.env.NEXT_PUBLIC_MATCHES_URL as string);
  const matches = await res.json();

  const filteredMatches = filterMatchesBySearchVal(search, matches);
  const totalItems = filteredMatches.length;

  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 20;
  const paginatedData: any = filteredMatches.slice(startIdx, endIdx);

  return { matches: paginatedData, totalItems };
};

export { fetchMatches, fetchCompetitionMatches, searchMatches };
