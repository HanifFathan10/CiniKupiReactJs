import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="">
        <p>Error 404 Not Found</p>
        <p>{error.statusText || error.message}</p>
    </div>
  )
};

export default ErrorPage;
