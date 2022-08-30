import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../features/auth/authSlice";

const RequireAuth = () => {
  const location = useLocation();
  const userRole = useSelector(selectUserRole) || localStorage.getItem("role");

  return userRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
