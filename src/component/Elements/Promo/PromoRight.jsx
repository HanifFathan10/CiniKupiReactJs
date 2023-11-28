import React from "react";
import { Link } from "react-router-dom";

const PromoRight = ({ image, title, description, alt, button }) => {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center bg-light pt-4 md:pt-8">
          <img src={image} alt={alt} width="100%" height="100%" className="block" />
          <div className="h-[375px] w-full md:h-full bg-[#103322] flex justify-center items-center">
            <div className="py-5 max-w-md flex flex-col justify-center items-center gap-3 px-4">
              <h1 className="font-bold text-3xl text-center">{title}</h1>
              <h3 className="font-semibold text-xl text-center">{description}</h3>
              <Link className="px-5 py-3 font-semibold rounded-full border border-secondary">{button}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromoRight;
