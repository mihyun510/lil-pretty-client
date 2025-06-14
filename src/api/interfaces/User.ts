export interface UserRequest {
  us_id: string;
  us_pw: string;
  us_nm: string;
  us_email: string;
  us_phone: string;
}

export interface UserResponse {
  token?: string;
  user?: UserRequest;
  message?: string;
}
