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

const filterMatchesBySearchVal = (
  search: string,
  matches: MatchType[]
): MatchType[] => {
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

const categorizeMatchesByDate = (matches: MatchType[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay() || 7; // Convertir domingo de 0 a 7

  const categorized = matches.reduce<Record<string, MatchType[]>>(
    (acc, match) => {
      const matchDate = new Date(match.Date);
      matchDate.setHours(0, 0, 0, 0);

      const diffInDays = Math.round(
        (matchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      let category;
      if (diffInDays === 0) {
        category = "Hoy";
      } else if (diffInDays === 1) {
        category = "Mañana";
      } else if (diffInDays > 1 && diffInDays < 7 - dayOfWeek + 1) {
        category = "Esta semana";
      } else if (
        diffInDays >= 7 - dayOfWeek + 1 &&
        diffInDays < 14 - dayOfWeek + 1
      ) {
        category = "Próxima semana";
      } else {
        category = "Más adelante";
      }

      if (!acc[category]) acc[category] = [];
      acc[category].push(match);
      return acc;
    },
    {}
  );

  return categorized;
};

export {
  filterActiveMatches,
  filterMatchesByCompetition,
  isMatchFinished,
  filterMatchesBySearchVal,
  categorizeMatchesByDate,
};
