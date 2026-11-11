import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RegisterBusinessForm } from "@/features/profile/components/RegisterBusinessForm";
import { AddProductForm } from "@/features/product/components/AddProductForm";
import type { MergedProfile } from "../types";
import { useState } from "react";
import { useLogout } from "@/features/auth/hooks/use-logout";

export const ProfileActions = ({
  profile,
  onEdit,
}: {
  profile: MergedProfile;
  onEdit: () => void;
}) => {
  const [isAddProductOpen, setIsAddProductOpen] =
    useState(false);
  const [isRegisterBusinessOpen, setIsRegisterBusinessOpen] =
    useState(false);

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex gap-2 w-full">
      <Button size="lg" onClick={onEdit}>
        Редактировать профиль
      </Button>
      {!!profile.business ? (
        <Dialog
          open={isAddProductOpen}
          onOpenChange={(open) => setIsAddProductOpen(open)}
        >
          <DialogTrigger
            render={
              <Button variant="outline" size="lg">
                Добавить товар
              </Button>
            }
          />
          <AddProductForm />
        </Dialog>
      ) : (
        <Dialog
          open={isRegisterBusinessOpen}
          onOpenChange={(open) =>
            setIsRegisterBusinessOpen(open)
          }
        >
          <DialogTrigger
            render={
              <Button variant="outline" size="lg">
                Зарегистрировать бизнес
              </Button>
            }
          />
          <RegisterBusinessForm
            profile={profile}
            onClose={() => setIsRegisterBusinessOpen(false)}
          />
        </Dialog>
      )}
      <Button
        size="lg"
        variant="destructive"
        onClick={handleLogout}
        className="justify-self-end"
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};
