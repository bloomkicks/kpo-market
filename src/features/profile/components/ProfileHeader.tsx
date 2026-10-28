import { UserIcon } from "@phosphor-icons/react";
import { profile } from "../types";

export const ProfileHeader = () => {
  return (
    <section className="bg-card-foreground/3 rounded-xl p-6 min-w-92">
      <div className="flex items-center gap-x-5">
        <UserIcon size={52} />
        <div className="space-y-2">
          <h2 className="text-xl font-bold">
            {profile.first_name} {profile.last_name}
          </h2>
          <p>{profile.phone}</p>
        </div>
      </div>
    </section>
  );
};
