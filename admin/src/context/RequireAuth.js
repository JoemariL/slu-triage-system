import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const refresh = async () => {
  
};

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  refresh();

  return auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
