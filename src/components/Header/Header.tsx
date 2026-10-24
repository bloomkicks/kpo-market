import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.png";
import cartImg from "@/assets/cart.svg";
import { NavLink } from "react-router";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.inner}>
        <NavLink to="/">
          <h1 className="text-[2rem] font-bold leading-none">
            Маркет
          </h1>
        </NavLink>
        <div className={styles.search}>
          <Input placeholder="Найти товары" />
          <Button size="lg">Найти</Button>
        </div>
        <div className={styles.links}>
          <NavLink to="/profile">
            <img src={profileImg} alt="Профиль" />
          </NavLink>
          <NavLink to="/cart">
            <img
              className="translate-y-px"
              src={cartImg}
              alt="Корзина"
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
