export interface UserRequest {
  usId: string;
  usPw: string;
  usNm: string;
  usEmail: string;
  usPhone: string;
}

export interface UserResponse {
  token?: string;
  user?: UserRequest;
  message?: string;
}
