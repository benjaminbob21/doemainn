import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./AppContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAppContext();
  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
