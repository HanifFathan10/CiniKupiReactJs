import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderBackProps {
  className?: string;
  title?: string;
}

const HeaderBack = ({ className, title }: HeaderBackProps) => {
  const Navigate = useNavigate();
  return (
    <section
      className={`flex h-12 w-full items-center justify-between rounded-lg bg-secondary px-3 py-6 text-white shadow-md ${className}`}
    >
      <button onClick={() => Navigate(-1)}>
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <h1 className="font-medium underline sm:text-xl">{title}</h1>
    </section>
  );
};

export default HeaderBack;
