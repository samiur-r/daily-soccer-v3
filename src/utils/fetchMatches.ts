import { MatchType } from "@/types/match";
import { DateTime } from "luxon";

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

const filterMatches = (matches: MatchType[]) => {
  const filteredMatches = matches.filter(
    (match) => !isMatchFinished(match.Date)
  );
  return filteredMatches;
};

const isMatchFinished = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  );
  const now = DateTime.utc().setZone("Europe/Madrid");

  const timeDifferenceMinutes = matchDate.diff(now, "minutes").minutes;

  if (timeDifferenceMinutes < -90) return true;
  else return false;
};

export default fetchMatches;
