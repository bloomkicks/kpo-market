import { profile } from "../types";
import { Button } from "@/components/ui/button";

export const ProfileActions = () => {
  if (profile.profile_type === "business")
    return <Button size="lg">Добавить товар</Button>;

  return <Button size="lg">Зарегистрировать бизнес</Button>;
};
