import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Loading } from "../utils";

const Home = lazy(() => import("./home/Home"));
const Private = lazy(() => import("./private/Private"));

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Products = lazy(() => import("./dashboard/products/Products"));
const Users = lazy(() => import("./dashboard/users/Users"));

const Auth = lazy(() => import("./auth/Auth"));
const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RouteController = () => {
   return useRoutes([
      {
         path: "",
         element: <Suspense fallback={<Loading/>}><Home/></Suspense>
      },
      {
         path: "dashboard",
         element: <Suspense fallback={<Loading/>}><Dashboard/></Suspense>,
         children: [
            {
               path: "",
               element: <Suspense fallback={<Loading/>}><Products/></Suspense>
            },
            {
               path: "users",
               element: <Suspense fallback={<Loading/>}><Users/></Suspense>
            }
         ]
      },
      {
         path: "auth",
         element: <Suspense fallback={<Loading/>}><Auth/></Suspense>,
         children: [
            {
               path: "",
               element: <Suspense fallback={<Loading/>}><Login/></Suspense>
            },
            {
               path: "register",
               element: <Suspense fallback={<Loading/>}><Register/></Suspense>
            }
         ]
      }
   ])
}

export default RouteController