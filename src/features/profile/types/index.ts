import type { UserRole } from '@/types';

export interface Profile {
  id: string,
  user_id: string,
  profile_type: UserRole,
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

export type MergedProfile = Profile & {
  business: {
    id: string | null
    phone: string | null;
    company_name: string | null;
  } | null
}

export type ProfileResponse = Profile[]

export interface EditProfileRequest {
  first_name: string,
  last_name: string,
  phone: string,
  company_name?: string
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

export type ProfileOrdersResponse = ProfileOrder[]

export interface BalanceResponse {
  amount: number
}

export type RegisterBusinessRequest = {
  company_name: string;
  phone: string;
}

export type RegisterBusinessResponse = Profile