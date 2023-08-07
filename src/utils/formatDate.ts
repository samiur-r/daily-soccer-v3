import { DateTime } from "luxon";

const formatDate = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  ).setLocale('es');

  const now = DateTime.utc().setZone("Europe/Madrid");

  const timeDifferenceMinutes = matchDate.diff(now, "minutes").minutes;

  if (timeDifferenceMinutes <= 0 && timeDifferenceMinutes >= -90)
    return "En juego";
  else if (timeDifferenceMinutes < -90) return "Finalizado";
  else if (timeDifferenceMinutes > 0 && timeDifferenceMinutes <= 1440)
    return "Mañana " + matchDate.toFormat("HH:mm");
  else if (now.hasSame(matchDate, "day"))
    return "Hoy " + matchDate.toFormat("HH:mm");
  else return matchDate.toFormat("EEEE, MMM. d, HH:mm");
};

export default formatDate;
