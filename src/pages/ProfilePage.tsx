import { ProfileDetails } from "@/features/profile/components/ProfileDetails";
import { ProfileActions } from "@/features/profile/components/ProfileActions";
import { ProfileOrders } from "@/features/profile/components/ProfileOrders";
import { EditProfileForm } from "@/features/profile/components/EditProfileForm";
import { EditProfileActions } from "@/features/profile/components/EditProfileActions";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { QueryState } from "@/components/QueryState";
import { useState } from "react";
import { selectProfile } from "@/utils/select-profile";

export const ProfilePage = () => {
  const { data: profile } = useProfile({
    select: selectProfile,
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <QueryState isEmpty={!profile}>
      {profile && (
        <div className="space-y-6">
          {isEditing ? (
            <>
              <EditProfileForm
                profile={profile}
                onClose={() => setIsEditing(false)}
              />
              <EditProfileActions
                onCancel={() => setIsEditing(false)}
              />
            </>
          ) : (
            <>
              <ProfileDetails profile={profile} />
              <ProfileActions
                profile={profile}
                onEdit={() => setIsEditing(true)}
              />
            </>
          )}
          {!profile.business && <ProfileOrders />}
        </div>
      )}
    </QueryState>
  );
};
