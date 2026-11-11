import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { StarIcon } from "@phosphor-icons/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateFeedback } from "../hooks/use-create-feedback";
import { useId } from "react";

const feedbackSchema = z.object({
  score: z
    .number()
    .int()
    .min(1, "Поставьте оценку")
    .max(5),
  description: z.string().trim(),
});
type FeedbackData = z.infer<typeof feedbackSchema>;

export const FeedbackForm = ({
  productId,
  productTitle,
  onClose,
}: {
  productId: string;
  productTitle?: string;
  onClose: () => void;
}) => {
  const id = useId();
  const form = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      score: 0,
      description: "",
    },
  });

  const { mutate: createFeedback, isPending } =
    useCreateFeedback();

  const handleCreate = (data: FeedbackData) => {
    createFeedback(
      {
        productId,
        score: data.score,
        description: data.description || undefined,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Отзыв{productTitle ? ` на «${productTitle}»` : ""}
        </DialogTitle>
      </DialogHeader>
      <form noValidate onSubmit={form.handleSubmit(handleCreate)}>
        <FieldGroup>
          <Controller
            name="score"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Оценка</FieldLabel>
                <div className="flex gap-x-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      aria-label={`Оценка ${score}`}
                      onClick={() => field.onChange(score)}
                      className="text-amber-400"
                    >
                      <StarIcon
                        size={32}
                        weight={score <= field.value ? "fill" : "regular"}
                      />
                    </button>
                  ))}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-description`}>
                  Комментарий
                </FieldLabel>
                <Textarea
                  {...field}
                  id={`${id}-description`}
                  placeholder="Что понравилось, а что нет (необязательно)"
                  aria-invalid={fieldState.invalid}
                  className="h-20 border border-border"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Отмена</Button>}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Отправить"}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
