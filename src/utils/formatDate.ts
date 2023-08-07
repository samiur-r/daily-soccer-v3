import { DateTime } from "luxon";

const formatDate = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  ).setLocale('es');

  const now = DateTime.utc().setZone("Europe/Madrid");

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // const timeDifferenceMinutes = matchDate.diff(now, "minutes").minutes;
  // if (timeDifferenceMinutes >= 0 && timeDifferenceMinutes <= 90)
  //   return "IN PLAY";
  // else if (now.hasSame(matchDate, "day"))
  //   return "TODAY " + matchDate.toFormat("HH:mm");
  // else if (timeDifferenceMinutes > 0 && timeDifferenceMinutes <= 1440)
  //   return "TOMORROW " + matchDate.toFormat("HH:mm");
  // else return matchDate.toFormat("EEEE, MMM. d, HH:mm");

  if (matchDate.hasSame(now, "day")) {
    if (matchDate.diff(now, "minutes").minutes <= 90) {
      return "En juego";
    } else {
      return `Hoy ${matchDate.toFormat("HH:mm")}`;
    }
  } else if (matchDate.hasSame(now.plus({ days: 1 }), "day")) {
    return `Mañana ${matchDate.toFormat("HH:mm")}`;
  } else {
    const formattedDate = matchDate.toFormat("EEEE d MMM. HH:mm");
    return capitalizeFirstLetter(formattedDate);
  }
};

export default formatDate;
