import type { Product } from "@/types";
import { AmountField } from "@/components/AmountField";
import { formatPrice } from "@/utils/format-price";
import { useCartStore } from "@/store/createStore";

export const CartItem = ({
  id,
  image,
  title,
  price,
  amount,
}: Product & { amount: number }) => {
  const setAmount = useCartStore((state) => state.setAmount);

  return (
    <div className="flex items-center gap-x-4">
      <img
        className="bg-card-foreground/5 rounded-sm"
        src={image}
        alt=""
        width="84px"
        height="88px"
      />
      <div className="grow">
        <h4 className="mb-2">{title}</h4>
        <p className="text-sm">{formatPrice(price)} за шт.</p>
      </div>
      <AmountField
        amount={amount}
        onPlus={() => setAmount(id, amount + 1)}
        onMinus={() => setAmount(id, amount - 1)}
      />
      <div className="w-28 text-right">
        <p className="text-lg mb-2">
          {formatPrice(price * amount)}
        </p>
        <p className="text-sm">{amount} шт.</p>
      </div>
    </div>
  );
};
