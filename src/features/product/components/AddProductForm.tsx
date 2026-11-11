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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "../hooks/use-add-product";
import { useId } from "react";
import { useNavigate } from "react-router";

const addProductSchema = z.object({
  title: z.string().trim().min(3, "Название слишком короткое"),
  description: z
    .string()
    .trim()
    .min(3, "Описание слишком короткое"),
  price: z.coerce
    .number<number>()
    .refine((val) => val !== 0, "Введите цену"),
  quantity: z.coerce
    .number<number>()
    .refine((val) => val !== 0, "Введите количество"),
});
type AddProductData = z.infer<typeof addProductSchema>;

export const AddProductForm = () => {
  const navigate = useNavigate();
  const id = useId();
  const form = useForm<AddProductData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      quantity: undefined,
    },
  });

  const { mutate: addProduct } = useAddProduct();

  const handleAddProduct = (data: AddProductData) => {
    addProduct(data, {
      onSuccess: (res) =>
        navigate(`/product/${res.product.productId}?edit=on`),
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Добавление товара
        </DialogTitle>
      </DialogHeader>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleAddProduct)}
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
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
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-description`}>
                  Описание
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-description`}
                  placeholder="Описание товара"
                  aria-invalid={fieldState.invalid}
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex grow gap-2">
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={`${id}-price`}>
                    Стоимость, ₽
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id={`${id}-price`}
                    placeholder="...."
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
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={`${id}-quantity`}>
                    Количество
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id={`${id}-quantity`}
                    placeholder="...."
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Отмена</Button>}
            />
            <Button type="submit">Добавить товар</Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
