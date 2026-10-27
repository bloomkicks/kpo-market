import profileImg from "@/assets/profile.png";
import { profile } from "@/types/mocks";

export const ProfileHeader = () => {
  return (
    <section className="bg-card-foreground/4 rounded-xl p-6 min-w-92">
      <div className="flex items-center gap-x-4">
        <img
          className="bg-card flex-none rounded-full"
          width="40px"
          height="40px"
          src={profileImg}
          alt="Профиль"
        />
        <div className="space-y-2">
          <h2 className="text-[2rem] font-bold">
            {profile.full_name}
          </h2>
          <p>{profile.email}</p>
          <p>{profile.phone_number}</p>
        </div>
      </div>
    </section>
  );
};
