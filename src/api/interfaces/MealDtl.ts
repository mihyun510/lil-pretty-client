// Meal 데이터 인터페이스
export interface MealDtlItems {
  mm_cd: string;
  mm_title: string;
  mm_subject_nm: string;
  mm_desc?: string;
  mm_kcal: number;
  mm_pri: number;
  mm_img?: string;
  md_cd: string;
  md_content: string;
  md_seq: string;
}

export interface MealAdminDtlItem {
  mm_cd: string;
  mm_dd: string;
  md_content: string;
  md_seq?: number;
}
