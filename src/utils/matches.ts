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

const filterMatchesBySearchVal = (search: string, matches: MatchType[]): MatchType[] => {
  const searchLower = search.toLowerCase();

  const filteredMatches = matches.filter((match) => {
    const { Name: localTeamName } = match.LocalTeam;
    const { Name: awayTeamName } = match.AwayTeam;
    const { Name: competitionName } = match.Competition;

    return [localTeamName, awayTeamName, competitionName].some((name) =>
      name.toLowerCase().includes(searchLower)
    );
  });

  return filteredMatches;
};

export {
  filterActiveMatches,
  filterMatchesByCompetition,
  isMatchFinished,
  filterMatchesBySearchVal,
};
