// 사용자 하루 물 섭취 기록 테이블 인터페이스
export interface WaterDailyItem {
  wd_cd: string; // 물 섭취량 코드 (PK)
  us_id: string; // 사용자 ID
  wd_date: string; // 기록 날짜 (YYYYMMDD)
  wd_ml: number; // 물 섭취량 (L 단위 — 예: 1.5)
}
