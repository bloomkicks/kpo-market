import { Link } from "react-router";
import { formatPrice } from "@/utils/format-price";
import { formatDate } from "@/utils/format-date";
import { Spinner } from "@/components/ui/spinner";
import { useOrders } from "../hooks/use-orders";

const statusLabels: Record<string, string> = {
  created: "Обрабатывается",
  paid: "Оплачен",
  failed: "Не оплачен",
  cancelled: "Отменён",
};

export const ProfileOrders = () => {
  const { data: orders, isLoading, isError } = useOrders();

  return (
    <section className="w-full p-6 rounded-lg ring-1 ring-border space-y-4">
      <h3 className="text-lg">Мои заказы</h3>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>Не удалось загрузить заказы</p>
      ) : !orders?.length ? (
        <p>Заказов пока нет</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center gap-x-4"
            >
              <div>
                <Link
                  to={`/product/${order.product_id}`}
                  className="underline"
                >
                  Товар
                </Link>{" "}
                x {order.quantity}
                <p className="text-sm">
                  {formatDate(new Date(order.created_at))}
                </p>
              </div>
              <span>
                {statusLabels[order.status.toLowerCase()] ??
                  order.status}
              </span>
              <strong>{formatPrice(order.total_price)}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
