import * as React from "react";
import { Link } from "react-router-dom";
import { TPromo } from "../../../Interface/itemsProduct";

const PromoLeft = ({
  image,
  title,
  description,
  alt,
  button,
  to,
  background,
}: TPromo) => {
  return (
    <>
      <section>
        <div className="flex flex-col-reverse bg-light pt-4 max-md:grid-cols-1 md:grid md:grid-cols-2 md:pt-8">
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
          <img
            src={image}
            alt={alt}
            width="100%"
            height="100%"
            className="block"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default PromoLeft;
