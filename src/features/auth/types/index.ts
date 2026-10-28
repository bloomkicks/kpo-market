export interface LoginRequest {
  email: string;
  password: string;
}

export interface Tokens {
  access_expires_at: string;
  access_token: string;
  refresh_expires_at: string;
  refresh_token: string;
}

export type LoginResponse = Tokens

export interface LogoutRequest {
  refresh_token: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export type RefreshResponse = Tokens

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  created_at: string,
  email: string,
  id: string,
  role: "customer" | "business"
}

export interface Error {
  error: string;
}