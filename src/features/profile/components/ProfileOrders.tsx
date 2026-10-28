import { order } from "../types";
import { formatPrice } from "@/utils/format-price";

export const ProfileOrders = () => {
  return (
    <div>
      <div>
        <b>Заказ</b> {order.id}
        <b>Статус</b> {order.status}
        <b>Стоимость</b> {formatPrice(order.total_price)}
      </div>
    </div>
  );
};
