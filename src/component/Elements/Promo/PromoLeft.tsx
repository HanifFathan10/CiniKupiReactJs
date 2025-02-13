import React from "react";
import { Link } from "react-router-dom";
import { PromoUIProps } from "../../../types/components";

const PromoLeft = ({
  image,
  title,
  description,
  alt,
  button,
  to,
  background,
}: PromoUIProps) => {
  return (
    <section className="bg-light flex flex-col-reverse pt-4 text-white max-md:grid-cols-1 md:grid md:grid-cols-2 md:pt-6">
      <div
        className={`flex h-[375px] w-full items-center justify-center md:h-full ${background} rounded-es-[36px]`}
      >
        <div className="flex max-w-md flex-col items-center justify-center gap-3 px-4 py-5">
          <h1 className="text-center text-3xl font-bold">{title}</h1>
          <h2 className="text-center text-xl font-semibold">{description}</h2>
          <Link
            to={to}
            className="rounded-full border border-teriary px-5 py-3 font-semibold transition-all hover:bg-teriary"
          >
            {button}
          </Link>
        </div>
      </div>
      <img
        src={image}
        alt={alt}
        width="20"
        height="20"
        className="block h-full w-full rounded-se-[36px]"
        loading="lazy"
      />
    </section>
  );
};

export default PromoLeft;
