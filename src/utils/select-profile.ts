import type { Profile, MergedProfile } from '@/features/profile/types';

export const selectProfile = (profiles: Profile[]): MergedProfile => {
  const customer = profiles.find(profile => profile.profile_type === "customer")
  if (!customer)
    throw new Error("No customer profile")

  const business = profiles.find(profile => profile.profile_type === "business")

  return {
    ...customer,
    business: business ? {
      id: business.id,
      company_name: business.company_name,
      phone: business.phone
    } : null
  }
}