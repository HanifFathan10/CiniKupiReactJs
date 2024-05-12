import React from "react";
import ArrowLeft from "../Icon/ArrowLeft";
import { useNavigate } from "react-router-dom";

const HeaderBack = ({ className, title }) => {
  const Navigate = useNavigate();
  return (
    <section
      className={`flex h-12 w-full items-center justify-between bg-[#212121] px-3 py-6 text-white  shadow-md ${className}`}
    >
      <button onClick={() => Navigate(-1)}>
        <ArrowLeft />
      </button>
      <h1 className="font-medium underline sm:text-xl">{title}</h1>
    </section>
  );
};

export default HeaderBack;
