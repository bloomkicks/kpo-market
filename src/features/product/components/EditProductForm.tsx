import { Button } from "@/components/ui/button";
import { TrashIcon } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";
import starImg from "@/assets/star.svg";
import { formatPrice } from "@/utils/format-price";
import type { Product } from "@/types";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useEditProduct } from "../hooks/use-edit-product";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { useNavigate } from "react-router";

const editProductSchema = z.object({
  title: z.string().trim().min(3, "Название слишком короткое"),
  description: z
    .string()
    .trim()
    .min(3, "Описание слишком короткое"),
  price: z.coerce
    .number<number>()
    .refine((val) => val !== 0, "Введите количество"),
});
type EditProductData = z.infer<typeof editProductSchema>;

export const EditProductForm = ({
  product,
  onClose,
  onApply,
}: {
  product: Product;
  onClose: () => void;
  onApply: () => void;
}) => {
  const id = useId();
  const navigate = useNavigate();
  const form = useForm<EditProductData>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
    },
  });
  const { mutate: edit } = useEditProduct(product.productId);
  const { mutate: deleteProduct } = useDeleteProduct(
    product.productId,
  );

  const handleEdit = (data: EditProductData) => {
    edit(data, {
      onSuccess: () => {
        onClose();
        onApply();
      },
    });
  };

  const handleDelete = () => {
    deleteProduct(undefined, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(handleEdit)}>
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="font-bold mb-4">
            <FieldLabel htmlFor={`${id}-title`}>
              Название
            </FieldLabel>
            <Input
              {...field}
              id={`${id}-title`}
              placeholder="Название товара"
              aria-invalid={fieldState.invalid}
              required
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="mb-4">
            <FieldLabel htmlFor={`${id}-price`}>
              Стоимость, ₽
            </FieldLabel>
            <Input
              {...field}
              type="number"
              id={`${id}-price`}
              placeholder="Цена товара"
              aria-invalid={fieldState.invalid}
              required
            />
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
          <Field className="mb-5">
            <FieldLabel htmlFor={`${id}-description`}>
              Описание
            </FieldLabel>
            <Textarea
              {...field}
              id={`${id}-description`}
              placeholder="Описание товара"
              aria-invalid={fieldState.invalid}
              required
              className="h-20 border border-border"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <div className="flex flex-col items-stretch gap-2">
        <Button
          variant="destructive"
          size="icon"
          className="self-end"
          onClick={handleDelete}
        >
          <TrashIcon />
        </Button>
        <Button type="submit" size="lg">
          Принять изменения
        </Button>
        <Button variant="outline" size="lg" onClick={onClose}>
          Отмена
        </Button>
      </div>
    </form>
  );
};
