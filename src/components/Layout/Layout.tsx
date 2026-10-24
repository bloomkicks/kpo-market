import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Outlet />
      </main>
    </>
  );
};
