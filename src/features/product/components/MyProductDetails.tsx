import { Button } from "@/components/ui/button";
import starImg from "@/assets/star.svg";
import { useState } from "react";
import { formatPrice } from "@/utils/format-price";
import { AmountField } from "@/components/AmountField";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";
import { HeartIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export const MyProductDetails = ({
  product,
  onEdit,
}: {
  product: Product;
  onEdit: () => void;
}) => {
  return (
    <section>
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
      <div className="flex flex-col items-stretch gap-y-2">
        <Button size="lg" onClick={onEdit} className="max-w-lg">
          Редактировать
        </Button>
      </div>
    </section>
  );
};
