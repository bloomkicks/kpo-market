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
import { useEditProfile } from "../hooks/use-edit-profile";
import type { EditProfileRequest, Profile } from "../types";

const editSchema = z.object({
  first_name: z.string().trim().max(100),
  last_name: z
    .string()
    .trim()
    .max(100)
    .refine((v) => !v || v.length >= 3, "Не короче 3 символов"),
  phone: z
    .string()
    .regex(/^((\+7|8|7)\d{10})?$/, "Телефон в формате +79991234567"),
  company_name: z.string().trim(),
});
type EditData = z.infer<typeof editSchema>;

export const EditProfileForm = ({
  profile,
  onSuccess,
}: {
  profile: Profile;
  onSuccess?: () => void;
}) => {
  const mutation = useEditProfile(profile.id);
  const isBusiness = profile.profile_type === "business";
  const form = useForm<EditData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      phone: profile.phone ?? "",
      company_name: profile.company_name ?? "",
    },
  });

  const onSubmit = (data: EditData) => {
    const body: EditProfileRequest = {};
    for (const [key, value] of Object.entries(data))
      if (value) body[key as keyof EditProfileRequest] = value;

    mutation.mutate(body, { onSuccess });
  };

  const { errors } = form.formState;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Редактирование профиля
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {isBusiness && (
            <Field>
              <FieldLabel htmlFor="edit-company">Название компании</FieldLabel>
              <Input id="edit-company" {...form.register("company_name")} />
              <FieldError errors={[errors.company_name]} />
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor="edit-first-name">Имя</FieldLabel>
            <Input id="edit-first-name" {...form.register("first_name")} />
            <FieldError errors={[errors.first_name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="edit-last-name">Фамилия</FieldLabel>
            <Input id="edit-last-name" {...form.register("last_name")} />
            <FieldError errors={[errors.last_name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="edit-phone">Телефон</FieldLabel>
            <Input id="edit-phone" placeholder="+79991234567" {...form.register("phone")} />
            <FieldError errors={[errors.phone]} />
          </Field>
          {mutation.isError && (
            <FieldError>{errorMessage(mutation.error)}</FieldError>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Отмена</Button>} />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : "Сохранить"}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};
