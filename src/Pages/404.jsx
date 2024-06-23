import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const ErrorPage = () => {
  const error = useRouteError();
  const handlingToHome = useNavigate();
  return (
    <>
      <HeadMetaData
        title="Error 404"
        metaDescription="Error Page by CiniKupi"
      />
      <main className="bg-light h-full w-full">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <img
            src="/images/error.webp"
            alt=""
            width={280}
            height={280}
            className="md:w-96"
          />
          <div className="my-6 flex flex-col items-center justify-center">
            <h1 className="flex gap-1 text-lg font-semibold">
              Error Message:
              <span className="text-xl font-bold">
                {error.status + `${" "}` + error.statusText || error.message}
              </span>
            </h1>
            <button
              onClick={() => handlingToHome("/")}
              className="hover:bg-chocolate hover:text-light mt-4 rounded-full border-2 border-dark px-6 py-2 font-semibold"
            >
              Back To Home
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
