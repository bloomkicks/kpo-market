import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavLink,
  useSearchParams,
  useNavigate,
} from "react-router";
import { useCartStore } from "@/store/cart-store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useState, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { selectIsBusiness } from "@/utils/select-is-business";
import {
  UserIcon,
  ShoppingCartSimpleIcon,
} from "@phosphor-icons/react";

export const Header = () => {
  const cartLines = useCartStore((s) => s.lines);
  const navigate = useNavigate();
  const isAuthed = useAuthStore((s) => !!s.access_token);
  const timerRef = useRef<number | undefined>(undefined);
  const { data: isBusiness } = useProfile({
    select: selectIsBusiness,
  });
  const [search, setSearch] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [_, setParams] = useSearchParams();

  let quantity = 0;
  cartLines.forEach((line) => {
    quantity += line.quantity;
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setParams((prev) => {
        if (!e.target.value.trim()) prev.delete("search");
        else prev.set("search", e.target.value.trim());
        return prev;
      });
    }, 200);
  };

  const handleSearch = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!search) navigate("/");
    else navigate(`/?search=${search}`);
  };

  return (
    <header className="w-full bg-light-gray">
      <nav className="max-w-360 my-0 mx-auto flex justify-between items-center py-4 px-9">
        <NavLink to="/">
          <h1 className="text-[2rem] font-bold leading-none">
            Маркет{" "}
            {isBusiness && (
              <span className="font-normal italic">Биз</span>
            )}
          </h1>
        </NavLink>
        <form
          onSubmit={handleSearch}
          className="flex gap-x-3 mx-8"
        >
          <Input
            variant="noborder"
            type="search"
            name="search"
            value={search}
            onChange={handleChange}
            className="md:min-w-92 max-w-md appearance-none"
            placeholder="Найти товары"
          />
          <Button type="submit" size="lg">
            Найти
          </Button>
        </form>
        {isAuthed ? (
          <div className="flex gap-x-4">
            <NavLink to="/profile">
              <UserIcon size={36} />
            </NavLink>
            {!isBusiness && (
              <>
                {/* <NavLink to="/likes">
                  <HeartIcon size={36} />
                </NavLink> */}
                <NavLink to="/order" className="relative">
                  <ShoppingCartSimpleIcon size={35} />
                  {!!quantity && (
                    <p className="absolute left-2/3 top-0 -translate-y-0.5 -translate-x-0.5 rounded-full bg-card text-[0.7rem] w-[1.2rem] h-[1.2rem] flex justify-center items-center ring-1 ring-border/20">
                      {quantity}
                    </p>
                  )}
                </NavLink>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-x-4">
            <Dialog
              open={isLoginOpen}
              onOpenChange={(open) => setIsLoginOpen(open)}
            >
              <DialogTrigger
                render={<Button size="lg">Войти</Button>}
              />
              <LoginForm onClose={() => setIsLoginOpen(false)} />
            </Dialog>
            <Dialog
              open={isRegisterOpen}
              onOpenChange={(open) => setIsRegisterOpen(open)}
            >
              <DialogTrigger
                render={
                  <Button variant="outline" size="lg">
                    Зарегистрироваться
                  </Button>
                }
              />
              <RegisterForm
                onClose={() => setIsRegisterOpen(false)}
              />
            </Dialog>
          </div>
        )}
      </nav>
    </header>
  );
};
