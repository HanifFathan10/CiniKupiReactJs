import * as React from "react";
import ArrowLeft from "../Icon/ArrowLeft";
import { useNavigate } from "react-router-dom";

const HeaderBack = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => {
  const Navigate = useNavigate();
  return (
    <section
      className={`flex h-12 w-full items-center justify-between bg-dark px-3 py-6 text-light  shadow-md ${className}`}
    >
      <button onClick={() => Navigate(-1)}>
        <ArrowLeft />
      </button>
      <h1 className="font-medium underline sm:text-xl">{title}</h1>
    </section>
  );
};

export default HeaderBack;