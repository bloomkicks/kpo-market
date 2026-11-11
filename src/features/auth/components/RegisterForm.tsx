import { toast } from "@/components/ui/toast";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useId, useRef } from "react";
import { useRegister } from "../hooks/use-register";
import axios from "axios";
import type { ErrorResponse } from "@/types";

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

export const RegisterForm = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const id = useId();
  const [isShowingPass, setIsShowingPass] = useState(false);
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const register = useRegister();

  const onRegister = (data: RegisterData) => {
    register.mutate(data, {
      onSuccess() {
        onClose();
      },
      // onError(error) {
      //   if (axios.isAxiosError<ErrorResponse>(error))
      //     toast.add({
      //       type: "error",
      //       title: "Неудача",
      //       description:
      //         (axios.isAxiosError<ErrorResponse>(error) &&
      //           error.response?.data.error) ??
      //         error.message,
      //     });
      // },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Регистрация
        </DialogTitle>
      </DialogHeader>
      <form noValidate onSubmit={form.handleSubmit(onRegister)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-email`}>
                  E-mail
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id={`${id}-email`}
                  autoComplete="email"
                  placeholder="Ваша почта"
                  required
                  aria-invalid={fieldState.invalid}
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
                <FieldLabel htmlFor={`${id}-password`}>
                  Пароль
                  {isShowingPass ? (
                    <Button
                      onClick={() => setIsShowingPass(false)}
                      variant="ghost"
                      size="icon-sm"
                    >
                      <EyeIcon />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsShowingPass(true)}
                      variant="ghost"
                      size="icon-sm"
                    >
                      <EyeSlashIcon />
                    </Button>
                  )}
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-password`}
                  type={isShowingPass ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Ваш пароль"
                  required
                  aria-invalid={fieldState.invalid}
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
