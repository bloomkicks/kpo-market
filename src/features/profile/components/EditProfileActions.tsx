import { Button } from "@/components/ui/button";

export const EditProfileActions = ({
  onCancel,
}: {
  onCancel: () => void;
}) => {
  return (
    <div className="flex gap-x-2">
      <Button type="submit" size="lg" form="edit-profile-form">
        Применить изменения
      </Button>
      <Button variant="outline" size="lg" onClick={onCancel}>
        Отменить
      </Button>
    </div>
  );
};
