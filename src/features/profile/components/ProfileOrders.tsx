import { useProfileOrders } from "../hooks/use-profile-orders";
import { QueryState } from "@/components/QueryState";
import { ProfileOrderCard } from "./ProfileOrderCard";

export const ProfileOrders = () => {
  const { data: orders } = useProfileOrders();

  return (
    <section>
      <h3 className="text-xl font-bold mb-4">Мои заказы</h3>
      <QueryState isEmpty={!orders?.length}>
        <div className="space-y-4">
          {!!orders &&
            orders.map((order) => (
              <ProfileOrderCard key={order.id} order={order} />
            ))}
        </div>
      </QueryState>
    </section>
  );
};
