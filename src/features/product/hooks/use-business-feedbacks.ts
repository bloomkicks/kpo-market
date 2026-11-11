import { api } from "@/api/client";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { FeedbacksResponse } from "../types";

const selectBusinessFeedbacks = (data: InfiniteData<FeedbacksResponse>) => ({
  ...data,
  pages: data.pages.flatMap((page) => page.feedbacks),
});

// отзывы на товары текущего бизнеса, новые первыми
export const useBusinessFeedbacks = () => {
  return useInfiniteQuery({
    queryKey: ["business-feedbacks"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<FeedbacksResponse>("/catalog/feedbacks/business", {
        params: { limit: 20, cursor: pageParam },
      });

      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    select: selectBusinessFeedbacks
  });
};
