import React, { lazy } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./router/index";
import { AuthGuard } from "../src/auth/index";
import { RoutesWithNotFound } from "./utils/index";
import { useEffect } from "react";
import axios from "axios";
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Private = lazy(() => import("./components/Private/Private"));
const Home = lazy(() => import("./components/Home"));
const Events = lazy(() => import("./components/Events"));
const LoginSuccess = lazy(() => import("./components/UI/LoginSuccess"));
function App() {
  const getUser = async () => {
    const data = await axios.get("/auth/user");
    console.log(data.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Home />} />
          <Route path={PublicRoute.HOME} element={<Home />} />
          <Route path={PublicRoute.LOGIN} element={<Login />} />
          <Route path={PublicRoute.REGISTER} element={<Register />} />
          <Route path={PublicRoute.EVENTS} element={<Events />} />
          <Route path={PublicRoute.LOGINSUCCESS} element={<LoginSuccess />} />
          <Route element={<AuthGuard />}>
            <Route path={`${PrivateRoute.PRIVATE}/*`} element={<Private />} />
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </div>
  );
}

export default App;
