import { toast } from '@/components/ui/toast';
import axios from 'axios';
import {
  QueryClient,
  MutationCache,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: () => {
      toast.add({ type: "success", title: "Успех!" });
    },
    onError: (error) => {
      if (axios.isAxiosError(error))
        toast.add({
          type: "error",
          title: "Неудача!",
          description: error.message,
        });
    },
  }),
});