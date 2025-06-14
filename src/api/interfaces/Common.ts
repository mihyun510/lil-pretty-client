export interface CommonResponse<T = unknown> {
  ok: boolean;
  data?: T;
  message?: string;
}
