import type { Profile } from '@/features/profile/types';

export const selectIsBusiness = (profiles: Profile[]): boolean => {
  return profiles.some(p => p.profile_type === "business")
}