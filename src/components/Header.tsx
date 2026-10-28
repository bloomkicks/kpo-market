import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { useCartStore } from "@/store/create-store";
import { useAuthStore } from "@/store/auth-store";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useEffect, useState, type SubmitEvent } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import {
  UserIcon,
  ShoppingCartSimpleIcon,
} from "@phosphor-icons/react";

export const Header = () => {
  const cartLines = useCartStore((state) => state.lines);
  const isAuth = useAuthStore((state) => !!state.tokens);
  const logout = useLogout();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const urlQuery = params.get("q") ?? "";
  const [search, setSearch] = useState(urlQuery);
  useEffect(() => setSearch(urlQuery), [urlQuery]);

  const onSearch = (e: SubmitEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(
      pathname === "/" ? params : undefined,
    );

    if (search.trim()) next.set("q", search.trim());
    else next.delete("q");

    navigate({ pathname: "/", search: next.toString() });
  };

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
        <form className="flex gap-x-3 mx-8" onSubmit={onSearch}>
          <Input
            variant="noborder"
            className="md:min-w-92 max-w-md"
            placeholder="Найти товары"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button size="lg" type="submit">
            Найти
          </Button>
        </form>
        {isAuth ? (
          <Button
            variant="outline"
            size="lg"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            Выйти
          </Button>
        ) : (
          <div className="flex gap-x-4">
            <Dialog
              open={isLoginOpen}
              onOpenChange={setIsLoginOpen}
            >
              <DialogTrigger
                render={<Button size="lg">Войти</Button>}
              />
              <LoginForm
                onSuccess={() => setIsLoginOpen(false)}
              />
            </Dialog>
            <Dialog
              open={isRegisterOpen}
              onOpenChange={setIsRegisterOpen}
            >
              <DialogTrigger
                render={
                  <Button variant="outline" size="lg">
                    Зарегистрироваться
                  </Button>
                }
              />
              <RegisterForm
                onSuccess={() => setIsRegisterOpen(false)}
              />
            </Dialog>
          </div>
        )}
        <div className="flex gap-x-4">
          {isAuth && (
            <NavLink to="/profile">
              <UserIcon size={36} />
            </NavLink>
          )}
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
