import * as z from "zod";
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
import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import { errorMessage } from "@/api/errors";
import { Spinner } from "@/components/ui/spinner";
import { EyeSlashIcon, EyeIcon } from "@phosphor-icons/react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.email("Некорректный адрес почты"),
  password: z.string(),
});
type LoginData = z.infer<typeof loginSchema>;

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const mutation = useLogin();
  const [isShowingPass, setIsShowingPass] = useState(false);
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (data: LoginData) => {
    mutation.mutate(data, { onSuccess });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Вход в аккаунт
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onLogin)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="login-email">
                  E-mail
                </FieldLabel>
                <Input
                  {...field}
                  id="login-email"
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
                <FieldLabel htmlFor="login-password">
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
                  id="login-password"
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
              {errorMessage(mutation.error, { 401: "Неверная почта или пароль" })}
            </FieldError>
          )}
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Отмена</Button>}
            />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : "Войти"}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
