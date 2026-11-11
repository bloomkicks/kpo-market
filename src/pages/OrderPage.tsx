import { CartItems } from "@/features/order/components/CartItems";
import { OrderForm } from "@/features/order/components/OrderForm";
import { useCartStore } from "@/store/cart-store";

export const OrderPage = () => {
  return (
    <>
      <h1 className="text-[2rem] font-bold mb-6">
        Оформление заказа
      </h1>
      <div className="flex items-start gap-x-6">
        <CartItems />
        <OrderForm />
      </div>
    </>
  );
};
