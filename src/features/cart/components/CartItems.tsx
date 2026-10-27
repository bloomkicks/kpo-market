import { Separator } from "@/components/ui/separator";
import { CartItem } from "./CartItem";
import { Fragment } from "react";
import { useCartStore } from "@/store/createStore";

export const CartItems = () => {
  const items = useCartStore((state) => state.items);

  return (
    <section className="w-full ring-1 ring-border rounded-lg p-6">
      <h3 className="text-[1.375rem] font-bold mb-5">
        Товары в корзине
      </h3>
      <div className="space-y-5">
        {items.map((item, i, arr) => (
          <Fragment key={item.product.id}>
            <CartItem {...item.product} amount={item.amount} />
            {i < arr.length - 1 ? <Separator /> : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
};
