import { StarIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import { formatDate } from "@/utils/format-date";
import { useProduct } from "../hooks/use-product";
import type { Feedback } from "../types";

// в отзыве только id товара - название берём из карточки каталога
export const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  const { data: product } = useProduct(feedback.productId);

  return (
    <div className="flex flex-col gap-y-3 ring-1 ring-border rounded-lg p-6">
      <div className="flex justify-between items-center gap-x-4">
        {product ? (
          <Link
            to={`/product/${feedback.productId}`}
            className="text-lg font-bold underline underline-offset-4"
          >
            {product.title}
          </Link>
        ) : (
          <p className="text-lg font-bold">Товар удалён</p>
        )}
        <div
          className="flex text-amber-400"
          aria-label={`Оценка ${feedback.score} из 5`}
        >
          {[1, 2, 3, 4, 5].map((score) => (
            <StarIcon
              key={score}
              size={22}
              weight={score <= feedback.score ? "fill" : "regular"}
            />
          ))}
        </div>
      </div>
      {!!feedback.description && <p>{feedback.description}</p>}
      <p className="text-sm text-muted-foreground">
        {formatDate(new Date(feedback.createdAt))}
      </p>
    </div>
  );
};
