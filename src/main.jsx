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
import HandleAuthSuccess from "./Pages/AuthLogin";
import CartPage from "./Pages/MenuPage/CartPage";
import { ChakraProvider } from "@chakra-ui/react";
import OrderStatus from "./Pages/OrderStatus";
import AdminPage from "./Pages/Admin/Admin";
import UserDashboardPage from "./Pages/Admin/users/UsersDashboardPage";
import ProductDashboardPage from "./Pages/Admin/Menus/ProductDashboardPage";
import MenuDashboardPage from "./Pages/Admin/Menus/MenuDashboardPage";
import TransactionDashboardPage from "./Pages/Admin/transactions/TransactionDashboardPage";
import "flowbite";
import ProductMenuPage from "./Pages/ProductMenuPage";

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
    path: "/menu/:name",
    element: <ProductMenuPage />,
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
    path: "/menu/cart",
    element: <CartPage />,
  },
  {
    path: "/auth-success",
    element: <HandleAuthSuccess />,
  },
  {
    path: "/history-transaction",
    element: <OrderStatus />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/users",
    element: <UserDashboardPage />,
  },
  {
    path: "/admin/menus/product",
    element: <ProductDashboardPage />,
  },
  {
    path: "/admin/menus/menu",
    element: <MenuDashboardPage />,
  },
  {
    path: "/admin/transactions",
    element: <TransactionDashboardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>,
);
