import { productDetails } from "@/types/mocks";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatPrice } from "@/utils/format-price";
// import starImg from "@/assets/star.svg";
import { AmountField } from "@/components/AmountField";
import { useCartStore } from "@/store/createStore";

export const ProductDetails = () => {
  const { productId } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  // const [curSize, setCurSize] = useState(
  //   productDetails.sizes[0],
  // );
  const [amount, setAmount] = useState(1);

  const onAddToCart = () => {
    addItem(
      {
        ...productDetails,
        ...(productId ? { id: Number(productId) } : {}),
        image: productDetails.images[0],
      },
      amount,
    );
  };

  return (
    <section>
      <h1 className="text-[2rem] font-bold mb-3">
        {productDetails.title}
      </h1>
      <p className="font-bold text-2xl mb-2">
        {formatPrice(productDetails.price)}
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
        amount={amount}
        onPlus={() => setAmount((prev) => prev + 1)}
        onMinus={() =>
          setAmount((prev) => Math.max(prev - 1, 1))
        }
      />
      <div className="flex flex-col items-stretch gap-y-2">
        <Button size="lg" onClick={onAddToCart}>
          В корзину
        </Button>
        <Button size="lg" variant="outline">
          Купить сейчас
        </Button>
      </div>
    </section>
  );
};
