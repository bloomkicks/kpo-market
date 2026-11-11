import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toast";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <Toaster />
      <Header />
      <main className="max-w-360 my-0 mx-auto py-8 px-9">
        <Outlet />
      </main>
    </>
  );
};
