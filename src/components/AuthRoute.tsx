import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

export const AuthRoute = () => {
  const isAuthed = useAuthStore((s) => !!s.access_token);
  const location = useLocation();

  if (!isAuthed)
    return (
      <Navigate to="/" replace state={{ from: location }} />
    );

  return <Outlet />;
};
