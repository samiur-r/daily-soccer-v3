import { DateTime } from "luxon";

const formatDate = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  );
  const now = DateTime.utc().setZone("Europe/Madrid");

  const timeDifferenceMinutes = matchDate.diff(now, "minutes").minutes;

  if (timeDifferenceMinutes <= 0 && timeDifferenceMinutes >= -90) {
    return "IN PLAY";
  } else if (timeDifferenceMinutes > 0 && timeDifferenceMinutes <= 1440) {
    // Tomorrow
    return "TOMORROW " + matchDate.toFormat("HH:mm");
  } else if (now.hasSame(matchDate, "day")) {
    // Today
    return "TODAY " + matchDate.toFormat("HH:mm");
  } else if (timeDifferenceMinutes > 1440 && timeDifferenceMinutes <= 4320) {
    // Within the next 3 days
    return matchDate.toFormat("EEEE, MMM. d, HH:mm");
  } else {
    // After 3 days, display the full date
    return matchDate.toFormat("EEEE, MMM. d, HH:mm");
  }
};

export default formatDate;
