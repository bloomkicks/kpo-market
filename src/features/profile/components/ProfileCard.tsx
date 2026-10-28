import { profile } from "../types";
import { formatDate } from "@/utils/format-date";

export const ProfileCard = () => {
  return (
    <section className="w-full p-6 rounded-lg ring-1 ring-border space-y-5">
      <h3 className="text-lg">Личные и контактные данные</h3>
      <div className="flex *:w-1/2">
        <div>
          <p className="text-sm mb-2">Имя и фамилия</p>
          <p>
            {profile.first_name} {profile.last_name}
          </p>
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
          <p>{profile.phone}</p>
        </div>
        <div>
          <p className="text-sm mb-2">Вы с нами с </p>
          <p>{formatDate(new Date(profile.created_at))}</p>
        </div>
      </div>
    </section>
  );
};
