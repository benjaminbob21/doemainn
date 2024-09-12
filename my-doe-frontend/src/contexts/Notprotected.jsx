import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./AppContext";

const Notprotected = () => {
  const { isLoggedIn } = useAppContext();
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Notprotected;
