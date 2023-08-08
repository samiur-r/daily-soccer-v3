import { DateTime } from "luxon";

const formatDate = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  ).setLocale('es');

  const now = DateTime.utc().setZone("Europe/Madrid");

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (matchDate.hasSame(now, "day")) {
    const differenceInMinutes = matchDate.diff(now, "minutes").minutes;

    // Si la diferencia en minutos es >=0 (partido aún no ha comenzado) y <90 (menos de una hora y media), el partido está en juego.
    // Si la diferencia es negativa pero > -90, significa que el partido ya comenzó pero aún no ha terminado.
    if (differenceInMinutes < 0 && differenceInMinutes > -90) {
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
