import { useEffect } from "react";
import useGetNewToken from "./Store/GetNewToken";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/404";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Menu from "./Pages/Menu";
import ProductMenuPage from "./Pages/ProductMenuPage";
import ProductCheckout from "./Pages/ProductCheckout";
import CartPage from "./Pages/MenuPage/CartPage";
import HandleAuthSuccess from "./Pages/AuthLogin";
import HistoryTransactionPage from "./Pages/HistoryTransactionPage";
import UserDashboardPage from "./Pages/Admin/users/UsersDashboardPage";
import ProductDashboardPage from "./Pages/Admin/Menus/ProductDashboardPage";
import MenuDashboardPage from "./Pages/Admin/Menus/MenuDashboardPage";
import TransactionDashboardPage from "./Pages/Admin/transactions/TransactionDashboardPage";
import { HelmetProvider } from "react-helmet-async";
import AdminPage from "./Pages/Admin/Admin";
import { useShallow } from "zustand/react/shallow";
import { RefreshToken } from "./services/auth.service";

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
    path: "/menu/:nameUrl",
    element: <ProductMenuPage />,
  },
  {
    path: "/product/:_id",
    element: <ProductCheckout />,
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
    element: <HistoryTransactionPage />,
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

const App = () => {
  const fetchRefreshToken = async () => {
    await RefreshToken((status, res) => {
      if (status) {
        sessionStorage.setItem("access_token", res.access_token);
        window.location.reload();
      }
    });
  };

  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (token == null) {
      fetchRefreshToken();
    }
  }, [fetchRefreshToken]);

  return (
    <ChakraProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ChakraProvider>
  );
};

export default App;
