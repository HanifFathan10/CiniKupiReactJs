import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/404";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CoomingSoon from "./Pages/CoomingSoon";
import Menu from "./Pages/Menu";
import ProductCheckout from "./Pages/ProductCheckout";
import HotCoffePage from "./Pages/MenuPage/HotCoffePage";
import IceCoffePage from "./Pages/MenuPage/IceCoffePage";
import HotDrinkPage from "./Pages/MenuPage/HotDrinkPage";
import IceDrinkPage from "./Pages/MenuPage/IceDrinkPage";
import LunchPage from "./Pages/MenuPage/LunchPage";
import BakeryPage from "./Pages/MenuPage/BakeryPage";
import Oatmeal from "./Pages/MenuPage/Oatmeal";
import Snack from "./Pages/MenuPage/Snack";
import MenuCoffeBeans from "./Pages/MenuPage/MenuCoffeBeans";
import AuthSuccessPage from "./Pages/AuthLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/product/:_id",
    element: <ProductCheckout />,
  },
  {
    path: "/coomingsoon",
    element: <CoomingSoon />,
  },
  {
    path: "/menu/drink/hot-coffe",
    element: <HotCoffePage />,
  },
  {
    path: "/menu/drink/ice-coffe",
    element: <IceCoffePage />,
  },
  {
    path: "/menu/drink/hot-drinks",
    element: <HotDrinkPage />,
  },
  {
    path: "/menu/drink/ice-drinks",
    element: <IceDrinkPage />,
  },
  {
    path: "/menu/food/lunch",
    element: <LunchPage />,
  },
  {
    path: "/menu/food/bakery",
    element: <BakeryPage />,
  },
  {
    path: "/menu/food/oatmeal-yoghurt",
    element: <Oatmeal />,
  },
  {
    path: "/menu/food/snack-sweet",
    element: <Snack />,
  },
  {
    path: "/menu/coffe-beans/",
    element: <MenuCoffeBeans />,
  },
  {
    path: "/auth-success",
    element: <AuthSuccessPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
