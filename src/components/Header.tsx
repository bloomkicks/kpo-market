import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useCartStore } from "@/store/create-store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import {
  UserIcon,
  ShoppingCartSimpleIcon,
} from "@phosphor-icons/react";

export const Header = () => {
  const cartLines = useCartStore((state) => state.lines);
  const isAuth = false;

  let quantity = 0;
  cartLines.forEach((line) => {
    quantity += line.quantity;
  });

  return (
    <header className="w-full bg-light-gray">
      <nav className="max-w-360 my-0 mx-auto flex justify-between items-center py-4 px-9">
        <NavLink to="/">
          <h1 className="text-[2rem] font-bold leading-none">
            Маркет
          </h1>
        </NavLink>
        <div className="flex gap-x-3 mx-8">
          <Input
            variant="noborder"
            className="md:min-w-92 max-w-md"
            placeholder="Найти товары"
          />
          <Button size="lg">Найти</Button>
        </div>
        <div className="flex gap-x-4">
          <Dialog>
            <DialogTrigger
              render={<Button size="lg">Войти</Button>}
            />
            <LoginForm />
          </Dialog>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" size="lg">
                  Зарегистрироваться
                </Button>
              }
            />
            <RegisterForm />
          </Dialog>
        </div>
        <div className="flex gap-x-4">
          <NavLink to="/profile">
            <UserIcon size={36} />
          </NavLink>
          <NavLink to="/cart" className="relative">
            <ShoppingCartSimpleIcon size={35} />
            {!!quantity && (
              <p className="absolute left-2/3 top-0 -translate-y-0.5 -translate-x-0.5 rounded-full bg-card text-[0.7rem] w-[1.2rem] h-[1.2rem] flex justify-center items-center ring-1 ring-border/20">
                {quantity}
              </p>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
