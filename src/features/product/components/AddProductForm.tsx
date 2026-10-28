import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
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
import { Spinner } from "@/components/ui/spinner";
import { errorMessage } from "@/api/errors";
import { useAddProduct } from "../hooks/use-add-product";
import { useAddImage } from "../hooks/use-add-image";

const productSchema = z.object({
  title: z.string().trim().min(1, "Укажите название"),
  description: z.string().trim(),
  price: z.coerce
    .number<string>()
    .int("Целое число")
    .positive("Больше нуля"),
  quantity: z.coerce
    .number<string>()
    .int("Целое число")
    .min(1, "От 1")
    .max(99, "До 99"),
});
type ProductInput = z.input<typeof productSchema>;
type ProductData = z.output<typeof productSchema>;

export const AddProductForm = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const navigate = useNavigate();
  const addProduct = useAddProduct();
  const addImage = useAddImage();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<ProductInput, unknown, ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      quantity: "1",
    },
  });

  const onSubmit = async (data: ProductData) => {
    const product = await addProduct.mutateAsync({
      ...data,
      description: data.description || undefined,
    });

    if (image)
      await addImage.mutateAsync({
        productId: product.productId,
        file: image,
      });

    onSuccess?.();
    navigate(`/product/${product.productId}`);
  };

  const isPending = addProduct.isPending || addImage.isPending;
  const { errors } = form.formState;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Новый товар
        </DialogTitle>
      </DialogHeader>
      <form
        onSubmit={form.handleSubmit((data) =>
          onSubmit(data).catch(() => {}),
        )}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="product-title">
              Название
            </FieldLabel>
            <Input
              id="product-title"
              className="min-w-24"
              {...form.register("title")}
            />
            <FieldError errors={[errors.title]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="product-description">
              Описание
            </FieldLabel>
            <Input
              id="product-description"
              className="min-w-24"
              {...form.register("description")}
            />
          </Field>
          <div className="grid grid-cols-2 gap-5 *:min-w-0">
            <Field>
              <FieldLabel htmlFor="product-price">
                Цена, ₽
              </FieldLabel>
              <Input
                id="product-price"
                type="number"
                className="md:min-w-24"
                min={1}
                {...form.register("price")}
              />
              <FieldError errors={[errors.price]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="product-quantity">
                Количество
              </FieldLabel>
              <Input
                id="product-quantity"
                type="number"
                className="md:min-w-24"
                min={1}
                max={99}
                {...form.register("quantity")}
              />
              <FieldError errors={[errors.quantity]} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="product-image">
              Картинка (jpeg или png)
            </FieldLabel>
            <Input
              id="product-image"
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) =>
                setImage(e.target.files?.[0] ?? null)
              }
            />
          </Field>
          {addProduct.isError && (
            <FieldError>
              {errorMessage(addProduct.error, {
                403: "Добавлять товары может только бизнес-профиль",
              })}
            </FieldError>
          )}
          {addImage.isError && (
            <FieldError>
              Товар создан, но картинку загрузить не удалось:{" "}
              {errorMessage(addImage.error)}
            </FieldError>
          )}
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Отмена</Button>}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Добавить"}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
