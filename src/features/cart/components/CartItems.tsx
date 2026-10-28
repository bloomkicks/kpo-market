import { Separator } from "@/components/ui/separator";
import { CartItem } from "./CartItem";
import { Fragment } from "react";
import { useCartStore } from "@/store/create-store";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Empty,
  EmptyHeader,
  EmptyContent,
} from "@/components/ui/empty";

export const CartItems = () => {
  const lines = useCartStore((state) => state.lines);

  return (
    <section className="w-full ring-1 ring-border rounded-lg p-6">
      <h3 className="text-[1.375rem] font-bold mb-5">
        Товары в корзине
      </h3>
      <div className="space-y-5">
        {!!lines.length ? (
          lines.map((line, i, arr) => (
            <Fragment key={line.product.productId}>
              <CartItem
                {...line.product}
                quantity={line.quantity}
              />
              {i < arr.length - 1 ? <Separator /> : null}
            </Fragment>
          ))
        ) : (
          <Empty>
            <EmptyHeader className="text-lg font-bold">
              Корзина пуста
            </EmptyHeader>
            <EmptyContent>
              <Link to="/">
                <Button variant="link" size="default">
                  Перейти к покупкам
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </section>
  );
};
