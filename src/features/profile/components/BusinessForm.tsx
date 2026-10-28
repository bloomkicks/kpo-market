import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useBusiness } from "../hooks/use-business";

const businessSchema = z.object({
  company_name: z.string().trim().min(1, "Укажите название").max(255),
  phone: z
    .string()
    .regex(/^(\+?[1-9]\d{1,14})?$/, "Телефон в формате +79991234567"),
});
type BusinessData = z.infer<typeof businessSchema>;

export const BusinessForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const mutation = useBusiness();
  const form = useForm<BusinessData>({
    resolver: zodResolver(businessSchema),
    defaultValues: { company_name: "", phone: "" },
  });

  const onSubmit = ({ company_name, phone }: BusinessData) => {
    mutation.mutate(
      { company_name, phone: phone || undefined },
      { onSuccess },
    );
  };

  const { errors } = form.formState;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Регистрация бизнеса
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="business-name">Название компании</FieldLabel>
            <Input id="business-name" placeholder="ООО «Ромашка»" {...form.register("company_name")} />
            <FieldError errors={[errors.company_name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="business-phone">Телефон</FieldLabel>
            <Input id="business-phone" placeholder="+79991234567" {...form.register("phone")} />
            <FieldError errors={[errors.phone]} />
          </Field>
          {mutation.isError && (
            <FieldError>
              {errorMessage(mutation.error, { 409: "Бизнес-профиль уже создан" })}
            </FieldError>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Отмена</Button>} />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : "Зарегистрировать"}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
