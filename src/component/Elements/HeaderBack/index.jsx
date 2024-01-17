import React from "react";
import ArrowLeft from "../Icon/ArrowLeft";
import { useNavigate } from "react-router-dom";

const HeaderBack = ({ className, title }) => {
  const Navigate = useNavigate();
  return (
    <section
      className={`w-full h-12 flex justify-between items-center bg-dark text-light px-3 py-6  shadow-md ${className}`}
    >
      <button onClick={() => Navigate(-1)}>
        <ArrowLeft />
      </button>
      <h1 className="font-medium sm:text-xl underline">{title}</h1>
    </section>
  );
};

export default HeaderBack;
