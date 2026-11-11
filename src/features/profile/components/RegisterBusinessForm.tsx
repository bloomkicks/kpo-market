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
import type { Profile } from "../types";
import { useRegisterBusiness } from "../hooks/use-register-business";
import { useId } from "react";

const registerBusinessSchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(1, "Введите название компании"),
  phone: z
    .e164()
    .refine((phone) => /^(\+7|8|7)\d{10}$/.test(phone)),
});
type RegisterBusinessData = z.infer<
  typeof registerBusinessSchema
>;

export const RegisterBusinessForm = ({
  profile,
  onClose,
}: {
  profile: Profile;
  onClose: () => void;
}) => {
  const id = useId();
  const form = useForm<RegisterBusinessData>({
    resolver: zodResolver(registerBusinessSchema),
    defaultValues: {
      company_name: profile.company_name ?? "",
      phone: profile.phone ?? "",
    },
  });

  const { mutate: registerBusiness } = useRegisterBusiness();

  const onRegister = (data: RegisterBusinessData) => {
    registerBusiness(data, { onSuccess: onClose });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Регистрация бизнеса
        </DialogTitle>
      </DialogHeader>
      <form noValidate onSubmit={form.handleSubmit(onRegister)}>
        <FieldGroup>
          <Controller
            name="company_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-company-name`}>
                  Название компании
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-company-name`}
                  placeholder="Ваша компания"
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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-phone`}>
                  Номер телефона
                </FieldLabel>
                <Input
                  {...field}
                  type="tel"
                  id={`${id}-phone`}
                  placeholder="Ваш номер"
                  aria-invalid={fieldState.invalid}
                  required
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
            <Button type="submit">Зарегистрироваться</Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
