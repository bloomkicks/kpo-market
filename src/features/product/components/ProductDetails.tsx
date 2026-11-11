import { Button } from "@/components/ui/button";
import starImg from "@/assets/star.svg";
import { useState, useMemo } from "react";
import { formatPrice } from "@/utils/format-price";
import { AmountField } from "@/components/AmountField";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";
import { useNavigate } from "react-router";
import { HeartIcon } from "@phosphor-icons/react";
import { useLike } from "../hooks/use-like";
import { useLikes } from "../hooks/use-likes";
import { Spinner } from "@/components/ui/spinner";

export const ProductDetails = ({
  product,
}: {
  product: Product;
}) => {
  const navigate = useNavigate();
  const [pendingQuantity, setPendingQuantity] = useState(1);
  const [isPendingLiked, setIsPendingLiked] = useState(false);
  const cartLine = useCartStore((s) =>
    s.lines.find(
      (line) => line.product.productId === product?.productId,
    ),
  );
  const addLine = useCartStore((s) => s.addLine);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);

  const { mutate: like, isPending: isLoading } = useLike();
  const { data: likes } = useLikes();
  const isLiked = useMemo(
    () =>
      likes?.some(
        (like) => like.product_id === product.productId,
      ) ?? isPendingLiked,
    [likes, isPendingLiked],
  );

  const handleLike = () => {
    const action = isLiked ? "remove" : "add";
    like(
      { id: product.productId, action },
      {
        onSuccess: () => {
          setIsPendingLiked(action === "add");
        },
      },
    );
  };

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
    addLine(product, pendingQuantity);
  };

  const onBuyNow = () => {
    if (!cartLine) addLine(product, pendingQuantity);
    navigate("/order");
  };

  const onRemoveFromCart = () => {
    if (!cartLine) return;
    removeLine(cartLine.product.productId);
    setPendingQuantity(1);
  };

  return (
    <section className="relative">
      <Button
        className="absolute right-0 top-0"
        size="icon-lg"
        onClick={handleLike}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <HeartIcon weight={isLiked ? "fill" : "regular"} />
        )}
      </Button>
      <h1 className="text-[2rem] font-bold mb-3">
        {product.title}
      </h1>
      <p className="font-bold text-2xl mb-4">
        {formatPrice(product.price)}
      </p>
      <div className="flex items-center gap-x-2.5 text-lg mb-5">
        <div className="flex items-center gap-x-2">
          <img className="w-9 h-9" src={starImg} alt="" />
          {!!product.feedbacksCount && (
            <p className="font-bold text-lg">{product.rating}</p>
          )}
        </div>
        <p className="text-lg">
          {product.feedbacksCount || "Отзывов нет"}
        </p>
      </div>
      <h2 className="text-lg mb-2">Описание</h2>
      <p className="mb-5 max-h-15 overflow-auto">
        {product.description}
      </p>
      <p className="mb-2">Количество:</p>
      <AmountField
        className="mb-5"
        amount={!!cartLine ? cartLine.quantity : pendingQuantity}
        onPlus={() => onSetAmount(true)}
        onMinus={() => onSetAmount()}
        min={1}
      />
      <div className="flex flex-col items-stretch gap-y-2">
        {!!cartLine ? (
          <Button size="lg" onClick={onRemoveFromCart}>
            Убрать из корзины
          </Button>
        ) : (
          <Button size="lg" onClick={onAddToCart}>
            В корзину
          </Button>
        )}
        <Button variant="outline" size="lg" onClick={onBuyNow}>
          Купить сейчас
        </Button>
      </div>
    </section>
  );
};
