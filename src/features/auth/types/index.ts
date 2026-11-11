import type { UserRole } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export type TokensResponse = {
  access_token: string;
  refresh_token: string;
  access_expires_at: string;
  refresh_expires_at: string;
}

export type LoginResponse = TokensResponse

export interface LogoutRequest {
  refresh_token: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export type RefreshResponse = TokensResponse

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  created_at: string,
  email: string,
  id: string,
  role: UserRole
}
