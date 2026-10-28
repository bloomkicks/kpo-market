import type { Profile } from "../types";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import { useBalance } from "../hooks/use-balance";
import { profileName } from "../utils";

export const ProfileCard = ({ profile }: { profile: Profile }) => {
  const { data: balance, isError } = useBalance();

  return (
    <section className="w-full p-6 rounded-lg ring-1 ring-border space-y-5">
      <h3 className="text-lg">Личные и контактные данные</h3>
      <div className="flex *:w-1/2">
        <div>
          <p className="text-sm mb-2">
            {profile.profile_type === "business"
              ? "Компания"
              : "Имя и фамилия"}
          </p>
          <p>{profileName(profile)}</p>
        </div>
        <div>
          <p className="text-sm mb-2">Тип профиля</p>
          <p>
            {profile.profile_type === "business"
              ? "Бизнес"
              : "Обычный"}
          </p>
        </div>
      </div>
      <div className="flex *:w-1/2">
        <div>
          <p className="text-sm mb-2">Телефон</p>
          <p>{profile.phone ?? "—"}</p>
        </div>
        <div>
          <p className="text-sm mb-2">Вы с нами с </p>
          <p>{formatDate(new Date(profile.created_at))}</p>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">Баланс</p>
        <p className="text-lg font-bold">
          {isError
            ? "Не удалось загрузить"
            : balance
              ? formatPrice(balance.amount)
              : "…"}
        </p>
      </div>
    </section>
  );
};
