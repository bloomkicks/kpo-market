export interface ErrorResponse {
  error: string;
}

export interface ValidationErrorLine {
  loc: [
    string,
    0
  ],
  msg: string,
  type: string,
  input: string,
  ctx: {}
}

export interface ValidationErrorResponse {
  detail: ValidationErrorLine[]
}

export interface DetailedErrorResponse {
  error: string;
}

export interface Tokens {
  access_token?: string;
  refresh_token?: string;
}

export interface TokenPayload {
  email: string;
  exp: number;
  iat: number;
  iss: string;
  role: UserRole;
  sub: string
}

export interface Product {
  productId: string;
  title: string;
  description: string;
  price: number;
  updatedAt: string;
  createdAt: string;
  url?: string;
  rating: number;
  feedbacksCount: number;
}

export type UserRole = "customer" | "business"