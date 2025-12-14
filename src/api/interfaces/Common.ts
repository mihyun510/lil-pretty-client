export interface CommonResponse<T = unknown> {
  ok: boolean;
  data?: T;
  message?: string;
}
export interface CUDCommonResponse<T = unknown> {
  successCount: number;
  failCount: number;
  data?: T[];
  message?: string;
}

export interface CUDFailItem {
  item: string;
  reason: string;
}
