import type { Profile } from "./types";

// бизнес-профиль главнее: с ним пользователь работает как продавец
export const mainProfile = (profiles: Profile[]) =>
  profiles.find((p) => p.profile_type === "business") ?? profiles[0];

export const profileName = (profile: Profile) => {
  if (profile.profile_type === "business" && profile.company_name)
    return profile.company_name;

  const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ");
  return name || "Имя не указано";
};
