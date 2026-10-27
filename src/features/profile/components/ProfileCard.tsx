import { profile } from "@/types/mocks";

export const ProfileCard = () => {
  return (
    <section className="w-full p-6 rounded-lg ring-1 ring-border space-y-5">
      <h3 className="text-lg">Личные и контактные данные</h3>
      <div className="flex *:w-1/2">
        <div>
          <p className="text-sm mb-2">Имя и фамилия</p>
          <p>{profile.full_name}</p>
        </div>
        <div>
          <p className="text-sm mb-2">Email</p>
          <p>{profile.email}</p>
        </div>
      </div>
      <div className="flex *:w-1/2">
        <div>
          <p className="text-sm mb-2">Телефон</p>
          <p>{profile.phone_number}</p>
        </div>
        <div>
          <p className="text-sm mb-2">Пункт выдачи заказа</p>
          <p>{profile.address}</p>
        </div>
      </div>
      <div className="flex *:w-1/2">
        <div>
          <p className="text-sm mb-2">Город</p>
          <p>{profile.city}</p>
        </div>
        <div>
          <p className="text-sm mb-2">Язык интерфейса</p>
          <p>Русский</p>
        </div>
      </div>
    </section>
  );
};
