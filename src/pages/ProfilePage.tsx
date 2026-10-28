import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileCard } from "@/features/profile/components/ProfileCard";
import { ProfileActions } from "@/features/profile/components/ProfileActions";
import { ProfileOrders } from "@/features/profile/components/ProfileOrders";

export const ProfilePage = () => {
  return (
    <>
      <div className="space-y-6">
        <ProfileHeader />
        <ProfileCard />
        <ProfileOrders />
        <ProfileActions />
      </div>
    </>
  );
};
