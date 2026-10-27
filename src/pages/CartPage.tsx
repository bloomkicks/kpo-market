import { CartItems } from "@/features/cart/components/CartItems";
import { OrderCard } from "@/features/order/components/OrderCard";
import { OrderHeader } from "@/features/order/components/OrderHeader";

export const CartPage = () => {
  return (
    <>
      <h1 className="text-[2rem] font-bold mb-6">Корзина</h1>
      <OrderHeader stage={1} />
      <div className="flex items-start gap-x-6">
        <CartItems />
        <OrderCard />
      </div>
    </>
  );
};
