import { UserIcon } from "@phosphor-icons/react";
import { formatDate } from "@/utils/format-date";
import type { MergedProfile } from "../types";
import { useBalance } from "../hooks/use-balance";
import { formatPrice } from "@/utils/format-price";
import { useAuthStore } from "@/store/auth-store";

export const ProfileDetails = ({
  profile,
}: {
  profile: MergedProfile;
}) => {
  const decodeToken = useAuthStore((s) => s.decodeToken);
  const { data: balance } = useBalance();
  const email = decodeToken()?.email;

  return (
    <section>
      <div className="bg-card-foreground/3 rounded-xl p-6 min-w-92 flex items-center gap-x-5 mb-6">
        <UserIcon size={52} />
        <div className="space-y-2">
          <h2 className="text-xl font-bold">
            {profile.first_name ?? "-"} {profile.last_name}
          </h2>
          <p>{email}</p>
        </div>
      </div>
      <div className="w-full p-6 rounded-lg ring-1 ring-border space-y-5">
        <p className="text-xl font-bold mb-4">
          Баланс: {formatPrice(balance?.amount ?? 0)}
        </p>
        <div className="flex *:w-1/2">
          <div>
            <p className="text-sm mb-2">Номер телефона</p>
            <p>{profile.phone || "-"}</p>
          </div>
          <div>
            <p className="text-sm mb-2">Компания</p>
            <p>{profile.business?.company_name || "-"}</p>
          </div>
        </div>
        <div className="flex *:w-1/2">
          <div>
            <p className="text-sm mb-2">Тип профиля</p>
            <p>{!!profile.business ? "Бизнес" : "Обычный"}</p>
          </div>
          <div>
            <p className="text-sm mb-2">Вы с нами с </p>
            <p>{formatDate(new Date(profile.created_at))}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
