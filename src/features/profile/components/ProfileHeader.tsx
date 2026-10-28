import { UserIcon } from "@phosphor-icons/react";
import type { Profile } from "../types";
import { profileName } from "../utils";

export const ProfileHeader = ({ profile }: { profile: Profile }) => {
  return (
    <section className="bg-card-foreground/3 rounded-xl p-6 min-w-92">
      <div className="flex items-center gap-x-5">
        <UserIcon size={52} />
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{profileName(profile)}</h2>
          <p>{profile.phone ?? "Телефон не указан"}</p>
        </div>
      </div>
    </section>
  );
};
