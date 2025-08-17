// Meal 데이터 인터페이스
export interface MealItems {
  mm_cd: string; // 식단 코드 (PK)
  mm_title: string; // 식단 제목
  mm_subject: string; // 식단 주제
  mm_category: string; // 식단 카테고리
  mm_desc?: string; // 식단 설명 (nullable 이라 optional 처리)
  mm_kcal: number; // 식단 칼로리
  mm_pri: number; // 식단 가격
  mm_img?: string; // 식단 이미지 명 (nullable 이라 optional 처리)
  favorite: string; //즐겨찾기
}
