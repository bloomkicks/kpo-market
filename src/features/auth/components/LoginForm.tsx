import { z } from "zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useId, useRef } from "react";
import { EyeSlashIcon, EyeIcon } from "@phosphor-icons/react";
import { useLogin } from "../hooks/use-login";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import type { ErrorResponse } from "@/types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.email("Некорректный адрес почты"),
  password: z.string().min(1, "Введите пароль"),
});
type LoginData = z.infer<typeof loginSchema>;

export const LoginForm = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const id = useId();
  const [isShowingPass, setIsShowingPass] = useState(false);
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useLogin();

  const onLogin = (data: LoginData) => {
    login.mutate(data, {
      onSuccess() {
        onClose();
      },
      // onError(error) {
      //   toast.add({
      //     type: "error",
      //     title: "Неудача",
      //     description:
      //       (axios.isAxiosError<ErrorResponse>(error) &&
      //         error.response?.data.error) ??
      //       error.message,
      //   });
      // },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Вход в аккаунт
        </DialogTitle>
      </DialogHeader>
      <form noValidate onSubmit={form.handleSubmit(onLogin)}>
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
                  type={isShowingPass ? "text" : "password"}
                  id={`${id}-password`}
                  placeholder="Ваш пароль"
                  autoComplete="off"
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
            <Button type="submit">Войти</Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
