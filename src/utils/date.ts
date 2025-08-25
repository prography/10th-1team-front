export function parseKoreanDateInfo(utcString: string) {
  const date = new Date(utcString);

  const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const now = new Date();

  const year = koreaDate.getFullYear();
  const month = koreaDate.getMonth() + 1;
  const day = koreaDate.getDate();

  const dayOfWeek = koreaDate.toLocaleDateString("ko-KR", { weekday: "long" });

  const isToday =
    year === now.getFullYear() &&
    month === now.getMonth() + 1 &&
    day === now.getDate();

  return {
    year,
    month,
    date: day,
    day: dayOfWeek,
    isToday,
    dateObj: koreaDate,
  };
}
