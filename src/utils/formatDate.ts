import { DateTime } from "luxon";

const formatDate = (dateString: string) => {
  const matchDate = DateTime.fromISO(dateString, { zone: "utc" }).setZone(
    "Europe/Madrid"
  );
  const now = DateTime.utc().setZone("Europe/Madrid");

  const timeDifferenceMinutes = matchDate.diff(now, "minutes").minutes;

  // if (timeDifferenceMinutes >= 0 && timeDifferenceMinutes <= 90)
  //   return "IN PLAY";
  // else if (now.hasSame(matchDate, "day"))
  //   return "TODAY " + matchDate.toFormat("HH:mm");
  // else if (timeDifferenceMinutes > 0 && timeDifferenceMinutes <= 1440)
  //   return "TOMORROW " + matchDate.toFormat("HH:mm");
  // else return matchDate.toFormat("EEEE, MMM. d, HH:mm");

  if (matchDate.hasSame(now, "day")) {
    if (matchDate.diff(now, "minutes").minutes <= 90) {
      return "IN PLAY";
    } else {
      return `TODAY ${matchDate.toFormat("HH:mm")}`;
    }
  } else if (matchDate.hasSame(now.plus({ days: 1 }), "day")) {
    return `TOMORROW ${matchDate.toFormat("HH:mm")}`;
  } else {
    return matchDate.toFormat("EEEE, LLL. d, HH:mm");
  }
};

export default formatDate;
