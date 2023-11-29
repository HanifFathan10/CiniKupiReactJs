import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const ErrorPage = () => {
  const error = useRouteError();
  const handlingToHome = useNavigate();
  return (
    <>
      <HeadMetaData title="Error 404" metaDescription="Error Page by CiniKupi" />
      <main className="w-full h-full bg-light">
        <div className="flex flex-col min-h-screen justify-center items-center">
          <img src="/images/error.webp" alt="" width={280} height={280} className="md:w-96" />
          <div className="my-6 flex flex-col justify-center items-center">
            <h1 className="font-semibold text-lg flex gap-1">
              Error Message:<span className="font-bold text-xl">{error.status + `${" "}` + error.statusText || error.message}</span>
            </h1>
            <button onClick={() => handlingToHome("/")} className="px-6 py-2 font-semibold rounded-full border-2 border-dark mt-4 hover:bg-primary hover:text-light">
              Back To Home
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
