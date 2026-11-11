import { formatPrice } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useOrder } from "../hooks/use-order";
import { Spinner } from "@/components/ui/spinner";
import { v7 as uuidv7 } from 'uuid';

export const OrderForm = () => {
  const { mutate: order, isPending } = useOrder();
  const line = useCartStore((s) => s.lines[0]);
  const removeLine = useCartStore((s) => s.removeLine);
  if (!line) return null;

  let quantity = line.quantity;
  let price = line.product.price * quantity;

  const handleOrder = () => {
    order(
      {
        operationId: uuidv7(),
        productId: line.product.productId,
        quantity,
      },
      { onSuccess: () => removeLine(line.product.productId) },
    );
  };

  return (
    <section className="w-full max-w-96 h-min p-6 rounded-lg ring-1 ring-border flex flex-col gap-y-5">
      <h3 className="text-[1.375rem] font-bold">
        Ваш текущий заказ
      </h3>
      <p>
        <span>
          {line.product.title}, {quantity} шт
        </span>{" "}
        <span className="float-right">
          {formatPrice(line.product.price)} за шт.
        </span>
      </p>
      <Separator />
      <p>
        <span className="text-lg">Итог</span>{" "}
        <strong className="text-2xl float-right">
          {formatPrice(price)}
        </strong>
      </p>
      <Button
        onClick={handleOrder}
        size="lg"
        className="w-full h-10 py-3 text-base border-0"
        disabled={isPending}
      >
        {isPending ? <Spinner /> : "Оформить"}
      </Button>
    </section>
  );
};
