import React from "react";
import { Link } from "react-router-dom";

const PromoRight = ({
  image,
  title,
  description,
  alt,
  button,
  to,
  background,
}) => {
  return (
    <>
      <section>
        <div className="bg-light grid grid-cols-1 place-content-center place-items-center pt-4 md:grid-cols-2 md:pt-6">
          <img
            src={image}
            alt={alt}
            width="20"
            height="20"
            className="block h-full w-full"
            loading="lazy"
          />
          <div
            className={`flex h-[375px] w-full items-center justify-center md:h-full ${background}`}
          >
            <div className="flex max-w-md flex-col items-center justify-center gap-3 px-4 py-5">
              <h1 className="text-center text-3xl font-bold">{title}</h1>
              <h3 className="text-center text-xl font-semibold">
                {description}
              </h3>
              <Link
                to={to}
                className="rounded-full border border-secondary px-5 py-3 font-semibold transition-all hover:bg-secondary"
              >
                {button}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromoRight;
