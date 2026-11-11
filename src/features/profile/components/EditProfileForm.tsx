import { UserIcon } from "@phosphor-icons/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import { useEditProfile } from "@/features/profile/hooks/use-edit-profile";
import { formatDate } from "@/utils/format-date";
import { z } from "zod";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import type { MergedProfile } from "../types";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { useBalance } from "../hooks/use-balance";
import { formatPrice } from "@/utils/format-price";

export const editProfileSchema = z.object({
  first_name: z.string().trim().min(1, "Введите имя"),
  last_name: z
    .string()
    .trim()
    .min(3, "Фамилия должна быть не меньше 3 символов"),
  phone: z
    .e164()
    .refine((phone) => /^(\+7|8|7)\d{10}$/.test(phone)),
});
export type EditProfileData = z.infer<typeof editProfileSchema>;

export const EditProfileForm = ({
  profile,
  onClose,
}: {
  profile: MergedProfile;
  onClose: () => void;
}) => {
  const id = useId();
  const { mutate: editProfile } = useEditProfile(profile.id);
  const { data: balance } = useBalance();
  const form = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      phone: profile.phone ?? "",
    },
  });

  const handleEdit = (data: EditProfileData) => {
    editProfile(data, { onSuccess: onClose });
  };

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(handleEdit)}
      id="edit-profile-form"
    >
      <div className="bg-card-foreground/3 rounded-xl px-6 p-4 min-w-92 flex items-center gap-x-5 mb-6">
        <UserIcon size={52} />
        <div className="flex grow gap-4">
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={`${id}-first-name`}>
                  Имя
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-first-name`}
                  placeholder="Ваше имя"
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
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={`${id}-last-name`}>
                  Фамилия
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-last-name`}
                  placeholder="Ваша фамилия"
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
      </div>
      <div className="w-full p-6 rounded-lg ring-1 ring-border space-y-5">
        <p className="text-xl font-bold mb-4">
          Баланс: {formatPrice(balance?.amount ?? 0)}
        </p>
        <div className="flex gap-2 *:pr-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={`${id}-phone`}>
                  Номер телефона
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-phone`}
                  type="tel"
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
          <Field className="gap-2">
            <FieldLabel htmlFor={`${id}-company`}>
              Компания
            </FieldLabel>
            <Input
              name="company_name"
              id={`${id}-company`}
              placeholder="Ваша компания"
              value={profile.business?.company_name ?? "-"}
              disabled
            />
          </Field>
        </div>
        <div className="flex gap-2 *:w-1/2">
          <div>
            <p className="text-sm mb-2">Тип профиля</p>
            <p>{!!profile.business ? "Бизнес" : "Обычный"}</p>
          </div>
          <div>
            <p className="text-sm mb-2">Вы с нами с </p>
            <p>{formatDate(new Date(profile.created_at))}</p>
          </div>
        </div>
      </div>
    </form>
  );
};
