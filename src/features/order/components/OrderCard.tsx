import { formatPrice } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useCartStore } from "@/store/create-store";

export const OrderCard = ({
  button = "Перейти к оформлению",
}: {
  button?: string;
}) => {
  const lines = useCartStore((s) => s.lines);
  let price = 0;
  let amount = 0;
  lines.forEach((line) => {
    price += line.product.price * line.quantity;
    amount += line.quantity;
  });

  return (
    <section className="w-full max-w-96 h-min p-6 rounded-lg ring-1 ring-border flex flex-col gap-y-5">
      <h3 className="text-[1.375rem] font-bold">Ваш заказ</h3>
      <p>
        <span>Товары, {amount} шт</span>{" "}
        <span className="float-right">{formatPrice(price)}</span>
      </p>
      <Separator />
      <p>
        <span className="text-lg">Подытог</span>{" "}
        <strong className="text-2xl float-right">
          {formatPrice(price)}
        </strong>
      </p>
      <p className="text-sm">
        Стоимость доставки рассчитается на этапе оформления
        заказа.
      </p>
      <Button
        render={<Link to="/order" />}
        nativeButton={false}
        size="lg"
        className="w-full h-10 py-3 text-base border-0"
        disabled={!lines.length}
      >
        {button}
      </Button>
    </section>
  );
};
