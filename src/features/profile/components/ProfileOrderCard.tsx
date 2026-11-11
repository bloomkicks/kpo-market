import { formatPrice } from "@/utils/format-price";
import { formatDate } from "@/utils/format-date";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FeedbackForm } from "@/features/product/components/FeedbackForm";
import { useProduct } from "@/features/product/hooks/use-product";
import { useMyFeedbacks } from "@/features/product/hooks/use-my-feedbacks";
import { Link } from "react-router";
import { useState } from "react";
import type { ProfileOrder } from "../types";

// статусы приходят из profile именами enum orders
const PAID_STATUS = "PAID";

export const ProfileOrderCard = ({ order }: { order: ProfileOrder }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const isPaid = order.status === PAID_STATUS;

  const { data: product } = useProduct(order.product_id);
  const { data: myFeedbacks } = useMyFeedbacks();
  // отзыв оставляют только на оплаченный товар и один раз
  const canLeaveFeedback =
    isPaid &&
    !!myFeedbacks &&
    !myFeedbacks.some((f) => f.productId === order.product_id);

  return (
    <div className="flex flex-col ring-1 ring-border rounded-lg p-6">
      <div className="flex justify-between mb-3">
        <p className="text-lg font-bold">
          Заказ на {formatPrice(order.total_price)}
        </p>
        <p>Статус: {order.status}</p>
      </div>
      <div className="flex justify-between items-center gap-x-4 mb-3">
        {product ? (
          <Link
            to={`/product/${order.product_id}`}
            className="underline underline-offset-4"
          >
            {product.title}, {order.quantity} шт
          </Link>
        ) : (
          <p>{order.quantity} шт</p>
        )}
        {canLeaveFeedback && (
          <Dialog
            open={isFeedbackOpen}
            onOpenChange={(open) => setIsFeedbackOpen(open)}
          >
            <DialogTrigger
              render={
                <Button variant="outline">Оставить отзыв</Button>
              }
            />
            <FeedbackForm
              productId={order.product_id}
              productTitle={product?.title}
              onClose={() => setIsFeedbackOpen(false)}
            />
          </Dialog>
        )}
      </div>
      <div className="flex justify-between">
        <div>{formatDate(new Date(order.created_at))}</div>
        <div>{order.id}</div>
      </div>
    </div>
  );
};
