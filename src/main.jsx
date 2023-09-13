import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/404";
import CoffePage from "./Pages/CoffePage";
import DrinkPage from "./Pages/DrinkPage";
import DessertPage from "./Pages/DessertPage";
import DetailPage from "./Pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage/>,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
