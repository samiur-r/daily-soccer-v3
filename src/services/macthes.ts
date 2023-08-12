import { filterMatches } from "@/utils/matches";

const fetchMatches = async (page: number) => {
  const res = await fetch(process.env.NEXT_PUBLIC_MATCHES_URL as string, {
    next: {
      revalidate: 60,
    },
  });
  const matches = await res.json();
  const filteredMatches = filterMatches(matches);
  const totalItems = filteredMatches.length;

  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 20;
  const paginatedData: any = filteredMatches.slice(startIdx, endIdx);

  return { matches: paginatedData, totalItems };
};

export { fetchMatches };
