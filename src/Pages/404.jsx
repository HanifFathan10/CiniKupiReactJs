import React from "react";
import { useRouteError } from "react-router-dom";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <HeadMetaData title="Error 404" metaDescription="Error Page by CiniKupi" />
      <div className="">
        <p>Error 404 Not Found</p>
        <p>{error.statusText || error.message}</p>
      </div>
    </>
  );
};

export default ErrorPage;
