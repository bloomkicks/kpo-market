import type { Product } from "@/types";
import { AmountField } from "@/components/AmountField";
import { formatPrice } from "@/utils/format-price";
import { useCartStore } from "@/store/create-store";

export const CartItem = ({
  productId,
  url,
  title,
  price,
  quantity,
}: Product & { quantity: number }) => {
  const setQuantity = useCartStore((state) => state.setQuantity);

  return (
    <div className="flex items-center gap-x-4">
      <img
        className="bg-card-foreground/5 rounded-sm"
        src={url}
        alt=""
        width="84px"
        height="88px"
      />
      <div className="grow">
        <h4 className="mb-2">{title}</h4>
        <p className="text-sm">{formatPrice(price)} за шт.</p>
      </div>
      <AmountField
        amount={quantity}
        onPlus={() => setQuantity(productId, quantity + 1)}
        onMinus={() => setQuantity(productId, quantity - 1)}
      />
      <div className="w-28 text-right">
        <p className="text-lg mb-2">
          {formatPrice(price * quantity)}
        </p>
        <p className="text-sm">{quantity} шт.</p>
      </div>
    </div>
  );
};
