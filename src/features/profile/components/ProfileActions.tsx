import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddProductForm } from "@/features/product/components/AddProductForm";
import { useAuthStore } from "@/store/auth-store";
import type { Profile } from "../types";
import { BusinessForm } from "./BusinessForm";
import { EditProfileForm } from "./EditProfileForm";

type DialogName = "edit" | "business" | "product";

export const ProfileActions = ({
  profile,
}: {
  profile: Profile;
}) => {
  const [openDialog, setOpenDialog] =
    useState<DialogName | null>(null);
  const [isBusinessCreated, setIsBusinessCreated] =
    useState(false);
  const isSeller = useAuthStore((s) => s.role === "business");

  const dialogProps = (name: DialogName) => ({
    open: openDialog === name,
    onOpenChange: (open: boolean) =>
      setOpenDialog(open ? name : null),
  });
  const close = () => setOpenDialog(null);

  const showBusiness = !isSeller || openDialog === "business";

  return (
    <div className="space-y-3">
      {isBusinessCreated && isSeller && (
        <p>
          Бизнес-профиль создан — теперь можно добавлять товары.
        </p>
      )}
      <div className="flex gap-x-4">
        <Dialog key="edit" {...dialogProps("edit")}>
          <DialogTrigger
            render={
              <Button size="lg" variant="outline">
                Редактировать профиль
              </Button>
            }
          />
          <EditProfileForm profile={profile} onSuccess={close} />
        </Dialog>
        {showBusiness ? (
          <Dialog key="business" {...dialogProps("business")}>
            <DialogTrigger
              render={
                <Button size="lg">
                  Зарегистрировать бизнес
                </Button>
              }
            />
            <BusinessForm
              onSuccess={() => {
                setIsBusinessCreated(true);
                close();
              }}
            />
          </Dialog>
        ) : (
          <Dialog key="product" {...dialogProps("product")}>
            <DialogTrigger
              render={<Button size="lg">Добавить товар</Button>}
            />
            <AddProductForm onSuccess={close} />
          </Dialog>
        )}
      </div>
    </div>
  );
};
