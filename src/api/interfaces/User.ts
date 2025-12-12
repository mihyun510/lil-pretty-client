export interface UserRequest {
  usId: string;
  usPw: string;
  usNm: string;
  usEmail: string;
  usPhone: string;
  usRole: string;
  token: string;
}

export interface UserResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: UserRequest;
  message?: string;
}
