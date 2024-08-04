import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

import { Loading } from "../utils";

const Home = lazy(() => import("./home/Home"));
const SinglePage = lazy(() => import("./single-page/SinglePage"));
const Cart = lazy(() => import("./cart/Cart"));
const Favorite = lazy(() => import("./favorite/Favorite"));
const Private = lazy(() => import("./private/Private"));

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Products = lazy(() => import("./dashboard/products/Products"));
const Users = lazy(() => import("./dashboard/users/Users"));
const Settings = lazy(() => import("./dashboard/settings/Settings"));
const Profile = lazy(() => import("./dashboard/profile/Profile"));

const Auth = lazy(() => import("./auth/Auth"));
const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RouteController = () => {
   const auth = useSelector(state => state);
   return useRoutes([
     {
       path: "",
       element: <Suspense fallback={<Loading />}><Home /></Suspense>
     },
     {
       path: "product/:id",
       element: <Suspense fallback={<Loading />}><SinglePage /></Suspense>
     },
     {
       path: "dashboard",
       element: <Suspense fallback={<Loading />}><Private /></Suspense>,
       children: [
         {
           path: "",
           element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
           children: [
             {
               path: "",
               element: <Suspense fallback={<Loading />}><Products /></Suspense>
             },
             {
               path: "users",
               element: <Suspense fallback={<Loading />}><Users /></Suspense>
             },
             {
               path: "settings",
               element: <Suspense fallback={<Loading />}><Settings /></Suspense>
             },
             {
               path: "profile",
               element: <Suspense fallback={<Loading />}><Profile /></Suspense>
             }
           ]
         }
       ]
     },
     {
       path: "auth",
       element: auth.token ? <Navigate to="/dashboard" /> : <Suspense fallback={<Loading />}><Auth /></Suspense>,
       children: [
         {
           path: "",
           element: <Suspense fallback={<Loading />}><Login /></Suspense>
         },
         {
           path: "register",
           element: <Suspense fallback={<Loading />}><Register /></Suspense>
         }
       ]
     },
     {
      path: "cart",
      element: <Suspense fallback={<Loading />}><Cart /></Suspense>
     },
     {
      path: "favorite",
      element: <Suspense fallback={<Loading />}><Favorite /></Suspense>
     }
   ]);
 };
 
 export default RouteController; 