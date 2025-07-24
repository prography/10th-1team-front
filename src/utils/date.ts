export function parseKoreanDateInfo(utcString: string) {
  const date = new Date(utcString);
  const now = new Date();

  // 년, 월, 일
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 요일 (한글)
  const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "long" });

  // 오늘 여부
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
    dateObj: date,
  };
}
