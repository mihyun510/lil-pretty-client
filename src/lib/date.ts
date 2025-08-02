// 오늘 날짜를 YYYYMMDD 형식으로 반환
export function getTodayYYYYMMDD(): string {
  const today = new Date();
  return formatDateYYYYMMDD(today);
}

// 오늘 날짜에서 7일 후 날짜를 YYYYMMDD 형식으로 반환
export function getOneWeekLaterYYYYMMDD(): string {
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  return formatDateYYYYMMDD(oneWeekLater);
}

// 내부 포맷터: Date 객체를 YYYYMMDD 문자열로 변환
function formatDateYYYYMMDD(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}
