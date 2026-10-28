import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { useState } from "react";
import { formatPrice } from "@/utils/format-price";
// import starImg from "@/assets/star.svg";
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
      {/* <div className="flex items-center gap-x-2.5 text-lg mb-5">
        <div className="flex items-center gap-x-2">
          <img className="w-9 h-9" src={starImg} alt="" />
          <p className="font-bold text-lg">
            {productDetails.review_value}
          </p>
        </div>
        <p className="text-lg">{productDetails.review_amount}</p>
      </div> */}
      {/* <p className="mb-2">Размер:</p>
      <div className="flex gap-x-3.5 mb-5">
        {productDetails.sizes.map((size) => (
          <Button
            className="text-lg px-5 py-1.5 border-none aria-pressed:ring-1 aria-pressed:ring-border"
            onClick={() => {
              setCurSize(size);
            }}
            variant="secondary"
            aria-pressed={size === curSize}
            key={size}
          >
            {size}
          </Button>
        ))}
      </div> */}
      <p className="mb-2">Количество:</p>
      <AmountField
        className="mb-5"
        amount={!!cartLine ? cartLine.quantity : pendingQuantity}
        onPlus={() => onSetAmount(true)}
        onMinus={() => onSetAmount()}
        min={1}
      />
      {!!cartLine ? (
        <Button size="lg" onClick={onRemoveFromCart}>
          Убрать из корзины
        </Button>
      ) : (
        <div className="flex flex-col items-stretch gap-y-2">
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
