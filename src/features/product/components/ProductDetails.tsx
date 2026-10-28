import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatPrice } from "@/utils/format-price";
import { AmountField } from "@/components/AmountField";
import { useCartStore } from "@/store/create-store";
import type { Product } from "@/types";
import { useNavigate } from "react-router";

export const ProductDetails = ({
  product,
}: {
  product: Product;
}) => {
  const navigate = useNavigate();
  const [pendingQuantity, setPendingQuantity] = useState(1);
  const cartLine = useCartStore((s) =>
    s.lines.find(
      (line) => line.product.productId === product?.productId,
    ),
  );
  const addLine = useCartStore((s) => s.addLine);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);

  const onSetAmount = (plus?: boolean) => {
    if (!!cartLine) {
      setQuantity(
        cartLine.product.productId,
        Math.max(1, cartLine.quantity + (plus ? 1 : -1)),
      );
    } else {
      setPendingQuantity((prev) =>
        Math.max(1, prev + (plus ? 1 : -1)),
      );
    }
  };

  const onAddToCart = () => {
    if (product) addLine(product, pendingQuantity);
  };

  const onBuyNow = () => {
    if (product) addLine(product, pendingQuantity);
    navigate("/order");
  };

  const onRemoveFromCart = () => {
    if (!cartLine) return;
    removeLine(cartLine.product.productId);
    setPendingQuantity(1);
  };

  return (
    <section>
      <h1 className="text-[2rem] font-bold mb-3">
        {product.title}
      </h1>
      <p className="font-bold text-2xl mb-2">
        {formatPrice(product.price)}
      </p>
      <p className="mb-2">Количество:</p>
      <AmountField
        className="mb-5"
        amount={!!cartLine ? cartLine.quantity : pendingQuantity}
        onPlus={() => onSetAmount(true)}
        onMinus={() => onSetAmount()}
        min={1}
      />
      {!!cartLine ? (
        <Button
          size="lg"
          variant="outline"
          onClick={onRemoveFromCart}
        >
          Убрать из корзины
        </Button>
      ) : (
        <div className="w-full flex flex-col items-stretch gap-y-2">
          <Button size="lg" onClick={onAddToCart}>
            В корзину
          </Button>
          <Button size="lg" variant="outline" onClick={onBuyNow}>
            Купить сейчас
          </Button>
        </div>
      )}
    </section>
  );
};
