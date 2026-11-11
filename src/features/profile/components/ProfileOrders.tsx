import { formatPrice } from "@/utils/format-price";
import { useProfileOrders } from "../hooks/use-profile-orders";
import { QueryState } from "@/components/QueryState";
import { formatDate } from "@/utils/format-date";

export const ProfileOrders = () => {
  const { data: orders } = useProfileOrders();

  return (
    <section>
      <h3 className="text-xl font-bold mb-4">Мои заказы</h3>
      <QueryState isEmpty={!orders?.length}>
        <div className="space-y-4">
          {!!orders &&
            orders.map((order) => (
              <div className="flex flex-col ring-1 ring-border rounded-lg p-6">
                <div className="flex justify-between mb-3">
                  <p className="text-lg font-bold">
                    Заказ на {" "}
                    {formatPrice(order.total_price)}
                  </p>
                  <p>Статус: {order.status}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    {formatDate(new Date(order.created_at))}
                  </div>
                  <div>{order.id}</div>
                </div>
              </div>
            ))}
        </div>
      </QueryState>
    </section>
  );
};
