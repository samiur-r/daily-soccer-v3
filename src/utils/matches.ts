import { MatchType } from "@/types/match";
import { DateTime } from "luxon";

const isMatchFinished = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  );
  const now = DateTime.utc().setZone("Europe/Madrid");

  const timeDifferenceMinutes = matchDate.diff(now, "minutes").minutes;

  if (timeDifferenceMinutes < -90) return true;
  else return false;
};

const filterActiveMatches = (matches: MatchType[]) => {
  const filteredMatches = matches.filter(
    (match) => !isMatchFinished(match.Date)
  );
  return filteredMatches;
};

const filterMatchesByCompetition = (
  matches: MatchType[],
  competition_name: string
) => {
  const activeMatches = filterActiveMatches(matches);
  const competitionMatches = activeMatches.filter(
    (match) => match.Competition.Name === competition_name
  );
  return competitionMatches;
};

export { filterActiveMatches, filterMatchesByCompetition, isMatchFinished };
