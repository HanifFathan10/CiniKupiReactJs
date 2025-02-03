import React from "react";
import { Link } from "react-router-dom";
import { PromoUIProps } from "../../../types/components";

const PromoRight = ({
  image,
  title,
  description,
  alt,
  button,
  to,
  background,
}: PromoUIProps) => {
  return (
    <section className="bg-light grid grid-cols-1 place-content-center place-items-center  pt-4 text-white md:grid-cols-2 md:pt-6">
      <img
        src={image}
        alt={alt}
        width="20"
        height="20"
        className="block h-full w-full rounded-ss-[36px]"
        loading="lazy"
      />
      <div
        className={`flex h-[375px] w-full items-center justify-center md:h-full ${background} rounded-ee-[36px]`}
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
    </section>
  );
};

export default PromoRight;
