import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "../router/index";

const AuthGuard = () => {
  const userState = useSelector((state) => state.isAuthenticated);

  return userState ? <Outlet /> : <Navigate replace to={PublicRoute.LOGIN} />;
};

export default AuthGuard;
