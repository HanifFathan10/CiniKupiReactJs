import React from "react";
import { Link, ErrorResponse, useRouteError } from "react-router-dom";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;
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
            <h1 className="flex flex-col items-center justify-center gap-1 text-2xl font-bold">
              {error.status + `${" "}` + error.statusText}
              <span className="text-lg font-semibold">{error.data}</span>
            </h1>
            <Link
              to="/"
              className="mt-4 rounded-full border-2 border-dark px-6 py-2 font-semibold transition duration-200 hover:bg-chocolate hover:text-white"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
