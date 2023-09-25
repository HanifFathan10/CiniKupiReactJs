import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/404";
import CoffePage from "./Pages/CoffePage";
import DrinkPage from "./Pages/DrinkPage";
import DessertPage from "./Pages/DessertPage";
import DetailPage from "./Pages/DetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CoomingSoon from "./Pages/CoomingSoon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/coffe",
    element: <CoffePage/>
  },
  {
    path: "/drink",
    element: <DrinkPage/>
  },
  {
    path: "/dessert",
    element: <DessertPage/>
  },
  {
    path: "/:id",
    element: <DetailPage/>
  },
  {
    path: "/coomingsoon",
    element: <CoomingSoon/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
