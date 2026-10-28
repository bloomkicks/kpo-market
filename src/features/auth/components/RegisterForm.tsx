import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useRegister } from "../hooks/use-register";
import { errorMessage } from "@/api/errors";
import { Spinner } from "@/components/ui/spinner";

const registerSchema = z.object({
  email: z.email("Некорректный адрес почты"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .refine(
      (password) => /^[A-Za-z0-9!@#$%^&*?]+$/.test(password),
      "Пароль содержит запрещенные символы",
    )
    .refine((password) => /[A-Za-z]/.test(password), {
      message: "Пароль должен включать хотя бы одну букву",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Пароль должен включать хотя бы одну цифру",
    }),
});
type RegisterData = z.infer<typeof registerSchema>;

export const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const mutation = useRegister();
  const [isShowingPass, setIsShowingPass] = useState(false);
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onRegister = (data: RegisterData) => {
    mutation.mutate(data, { onSuccess });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Регистрация
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onRegister)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="register-email">
                  E-mail
                </FieldLabel>
                <Input
                  {...field}
                  id="register-email"
                  placeholder="Ваша почта"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="register-password">
                  Пароль
                  {isShowingPass ? (
                    <Button
                      onClick={() => setIsShowingPass(false)}
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                    >
                      <EyeIcon />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsShowingPass(true)}
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                    >
                      <EyeSlashIcon />
                    </Button>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  id="register-password"
                  placeholder="Ваш пароль"
                  type={isShowingPass ? "text" : "password"}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {mutation.isError && (
            <FieldError>
              {errorMessage(mutation.error, { 409: "Пользователь с такой почтой уже существует" })}
            </FieldError>
          )}
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Отмена</Button>}
            />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : "Зарегистрироваться"}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
