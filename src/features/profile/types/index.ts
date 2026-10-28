import { v7 as uuidv7 } from "uuid";
export type ProfileType = "customer" | "business"

export interface Profile {
  id: string,
  user_id: string,
  profile_type: ProfileType,
  first_name: string;
  last_name: string;
  phone: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export const profile: Profile = {
  id: uuidv7(),
  user_id: uuidv7(),
  profile_type: "business",
  first_name: "Анна",
  last_name: "Иванова",
  phone: "+7 900 123-45-67",
  created_at: (new Date()).toISOString(),
  updated_at: (new Date()).toISOString()
  // email: "anna.ivanova@example.com",
  // city: "Москва",
  // address: "Москва, ул. Лесная, д. 5"
}

export type ProfileResponse = Profile

export interface ValidationErrorDetail {
  loc: [
    string,
    0
  ],
  msg: string,
  type: string,
  input: string,
  ctx: {}
}

export interface ValidationError {
  detail: ValidationErrorDetail[]
}

export interface EditProfileRequest {
  first_name: string,
  last_name: string,
  phone: string,
  company_name: string
}

export type EditProfileResponse = Profile

export interface ProfileOrder {
  id: string,
  product_id: string,
  quantity: number,
  total_price: number,
  status: string,
  created_at: string
}

export type OrdersResponse = ProfileOrder[]

export const order: ProfileOrder = {
  id: uuidv7(),
  product_id: uuidv7(),
  quantity: 3,
  total_price: 10242,
  status: 'fye',
  created_at: (new Date()).toISOString()
}

export interface BalanceResponse {
  amount: number
}

export interface BusinessRequest {
  company_name: string,
  phone: string
}

export type BusinessResponse = Profile


// "phone": "+73179833776",
// id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// profile_type: "customer",
// updated_at: "2026-10-28T04:37:52.852Z"