import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { QueryState } from "@/components/QueryState";
import { FeedbackCard } from "@/features/product/components/FeedbackCard";
import { useBusinessFeedbacks } from "@/features/product/hooks/use-business-feedbacks";

export const ProfileBusinessFeedbacks = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBusinessFeedbacks();
  const feedbacks = data?.pages ?? [];

  return (
    <section>
      <h3 className="text-xl font-bold mb-4">Отзывы на мои товары</h3>
      <QueryState
        isLoading={isLoading}
        isEmpty={!feedbacks.length}
        emptyHeader="На ваши товары пока нет отзывов"
      >
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
        {hasNextPage && (
          <Button
            variant="outline"
            className="flex mt-6 mx-auto"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? <Spinner /> : "Загрузить ещё"}
          </Button>
        )}
      </QueryState>
    </section>
  );
};
