import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NoAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return !auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to="/main" state={{ from: location }} replace />
    // <Navigate to="/" state={{ from: location }} replace />
  );
};

export default NoAuth;
