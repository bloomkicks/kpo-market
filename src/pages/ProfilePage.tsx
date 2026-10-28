import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileCard } from "@/features/profile/components/ProfileCard";
import { ProfileActions } from "@/features/profile/components/ProfileActions";
import { ProfileOrders } from "@/features/profile/components/ProfileOrders";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { mainProfile } from "@/features/profile/utils";
import { useAuthStore } from "@/store/auth-store";
import { Empty, EmptyHeader } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export const ProfilePage = () => {
  const isAuth = useAuthStore((s) => !!s.tokens);
  const { data: profiles, isLoading, isError } = useProfile();

  if (!isAuth)
    return (
      <Empty>
        <EmptyHeader className="text-lg font-bold">
          Войдите, чтобы открыть профиль
        </EmptyHeader>
      </Empty>
    );

  if (isLoading) return <Spinner className="mx-auto mt-8" />;

  const profile = profiles?.length ? mainProfile(profiles) : null;
  if (isError || !profile)
    return (
      <Empty>
        <EmptyHeader className="text-lg font-bold">
          {isError
            ? "Не удалось загрузить профиль"
            : "Профиль ещё создаётся, обновите страницу через пару секунд"}
        </EmptyHeader>
      </Empty>
    );

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />
      <ProfileCard profile={profile} />
      <ProfileOrders />
      <ProfileActions profile={profile} />
    </div>
  );
};
