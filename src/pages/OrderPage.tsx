import { Link } from "react-router";
import { OrderCard } from "@/features/order/components/OrderCard";
import { OrderHeader } from "@/features/order/components/OrderHeader";
import { useCheckout } from "@/features/order/hooks/use-order";
import { useCartStore } from "@/store/create-store";
import { useAuthStore } from "@/store/auth-store";
import { errorMessage } from "@/api/errors";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyContent } from "@/components/ui/empty";

const orderErrors = {
  403: "Заказы может оформлять только покупатель",
  409: "Такой заказ уже оформлен",
};

export const OrderPage = () => {
  const lines = useCartStore((s) => s.lines);
  const removeLine = useCartStore((s) => s.removeLine);
  const isAuth = useAuthStore((s) => !!s.tokens);
  const checkout = useCheckout();

  const onSubmit = () =>
    checkout.mutate(lines, {
      onSuccess(results) {
        // из корзины убираем только то, что удалось оформить
        results.forEach(({ line, result }) => {
          if (result.status === "fulfilled") removeLine(line.product.productId);
        });
      },
    });

  const failed = checkout.data?.filter(({ result }) => result.status === "rejected") ?? [];
  const isDone = !!checkout.data && !failed.length;

  return (
    <>
      <h1 className="text-[2rem] font-bold mb-6">
        Оформление заказа
      </h1>
      <OrderHeader stage={isDone ? 3 : 2} />
      {isDone ? (
        <Empty>
          <EmptyHeader className="text-lg font-bold">
            Заказ оформлен! Статус оплаты появится в профиле
          </EmptyHeader>
          <EmptyContent>
            <Link to="/profile">
              <Button variant="link" size="default">
                Перейти в профиль
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex items-start gap-x-6">
          <section className="w-full ring-1 ring-border rounded-lg p-6 space-y-3">
            <h3 className="text-[1.375rem] font-bold">Подтверждение</h3>
            {!isAuth ? (
              <p>Войдите, чтобы оформить заказ.</p>
            ) : (
              <p>
                Оплата спишется с баланса профиля. По каждому товару
                в корзине оформится отдельный заказ.
              </p>
            )}
            {failed.map(({ line, result }) => (
              <p key={line.product.productId} className="text-destructive">
                «{line.product.title}»:{" "}
                {result.status === "rejected" &&
                  errorMessage(result.reason, orderErrors)}
              </p>
            ))}
          </section>
          <OrderCard
            button="Оформить заказ"
            onSubmit={isAuth ? onSubmit : undefined}
            isPending={checkout.isPending}
          />
        </div>
      )}
    </>
  );
};
