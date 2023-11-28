import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
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
import HandleAuthSuccess from "./Pages/AuthLogin";
import CartPage from "./Pages/MenuPage/CartPage";
import { ChakraProvider } from '@chakra-ui/react'
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

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
    path: "/menu/cart",
    element: <CartPage />,
  },
  {
    path: "/auth-success",
    element: <HandleAuthSuccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RouterProvider router={router} />
    </SkeletonTheme>
  </ChakraProvider>
);
