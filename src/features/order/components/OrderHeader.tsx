import { cn } from "cn";
export const OrderHeader = ({
  stage,
}: {
  stage: number;
}) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-sm bg-card-foreground/5 mb-6">
      <div className="flex items-center gap-x-3">
        <div
          className={cn(
            "flex  justify-center items-center w-7 h-7 text-sm bg-card rounded-full ring-1 ring-border dark:ring-0",
            stage >= 1 ? "dark text-foreground" : "",
          )}
        >
          <span>1</span>
        </div>
        <p>Корзина</p>
      </div>
      <div className="flex items-center gap-x-3">
        <div
          className={cn(
            "flex justify-center items-center w-7 h-7 text-sm bg-card rounded-full ring-1 ring-border dark:ring-0",
            stage >= 2 ? "dark text-foreground" : "",
          )}
        >
          <span>2</span>
        </div>
        <span className="text-secondary-foreground">
          Оформление заказа
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <div
          className={cn(
            "flex  justify-center items-center w-7 h-7 text-sm bg-card rounded-full ring-1 ring-border dark:ring-0",
            stage >= 3 ? "dark text-foreground" : "",
          )}
        >
          <span>3</span>
        </div>
        <span className="text-secondary-foreground">
          Заказ оформлен
        </span>
      </div>
    </div>
  );
};
