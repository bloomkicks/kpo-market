import { OrderCard } from "@/features/order/components/OrderCard";
import { OrderHeader } from "@/features/order/components/OrderHeader";
import { OrderForm } from "@/features/order/components/OrderForm";

export const OrderPage = () => {
  return (
    <>
      <h1 className="text-[2rem] font-bold mb-6">
        Оформление заказа
      </h1>
      <OrderHeader stage={2} />
      <div className="flex items-start gap-x-6">
        <OrderForm />
        <OrderCard />
      </div>
    </>
  );
};
