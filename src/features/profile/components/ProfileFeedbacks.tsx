import { QueryState } from "@/components/QueryState";
import { FeedbackCard } from "@/features/product/components/FeedbackCard";
import { useMyFeedbacks } from "@/features/product/hooks/use-my-feedbacks";

export const ProfileFeedbacks = () => {
  const { data: feedbacks, isLoading } = useMyFeedbacks();

  return (
    <section>
      <h3 className="text-xl font-bold mb-4">Мои отзывы</h3>
      <QueryState
        isLoading={isLoading}
        isEmpty={!feedbacks?.length}
        emptyHeader="Вы пока не оставили ни одного отзыва"
      >
        <div className="space-y-4">
          {feedbacks?.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </QueryState>
    </section>
  );
};
