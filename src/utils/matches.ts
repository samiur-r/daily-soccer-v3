import { MatchType } from "@/types/match";
import { DateTime } from "luxon";

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

export { filterMatches, isMatchFinished };
