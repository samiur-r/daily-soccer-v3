const formatDate = (dateString: string) => {
  const madridOffset = 2;
  const date = new Date(dateString);
  const now = new Date();

  date.setHours(date.getHours() + madridOffset);
  now.setHours(now.getHours() + madridOffset);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  if (date.toDateString() === now.toDateString()) {
    const timeDifference = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60)
    );
    if (timeDifference <= 90) {
      return "IN PLAY";
    } else {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `TODAY ${hours}:${minutes}`;
    }
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(tomorrow.getHours() + madridOffset);
  if (date.toDateString() === tomorrow.toDateString()) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `TOMORROW ${hours}:${minutes}`;
  }

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${dayName}, ${monthName} ${dayOfMonth}, ${hours}:${minutes}`;
};

export default formatDate;
