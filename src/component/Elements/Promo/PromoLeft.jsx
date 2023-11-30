import React from "react";
import { Link } from "react-router-dom";

const PromoLeft = ({ image, title, description, alt, button , to, background }) => {
  return (
    <>
      <section>
        <div className="flex flex-col-reverse md:grid max-md:grid-cols-1 md:grid-cols-2 bg-light pt-4 md:pt-8">
          <div className={`h-[375px] w-full md:h-full flex justify-center items-center ${background}`}>
            <div className="py-5 max-w-md flex flex-col justify-center items-center gap-3 px-4">
              <h1 className="font-bold text-3xl text-center">{title}</h1>
              <h3 className="font-semibold text-xl text-center">{description}</h3>
              <Link to={to} className="px-5 py-3 font-semibold rounded-full border border-secondary hover:bg-secondary transition-all">{button}</Link>
            </div>
          </div>
          <img src={image} alt={alt} width="100%" height="100%" className="block" />
        </div>
      </section>
    </>
  );
};

export default PromoLeft;
