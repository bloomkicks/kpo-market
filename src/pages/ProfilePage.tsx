import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileCard } from "@/features/profile/components/ProfileCard";

export const ProfilePage = () => {
  return (
    <>
      <h1 className="text-[2rem] font-bold mb-6">Профиль</h1>
      <div className="flex gap-x-6 items-start">
        <ProfileHeader />
        <ProfileCard />
      </div>
    </>
  );
};
