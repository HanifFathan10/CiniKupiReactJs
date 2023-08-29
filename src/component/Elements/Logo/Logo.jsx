import React from "react";
import { GiCoffeeBeans } from 'react-icons/Gi';

export const Logo = () => {
  return (
    <>
      <div className="flex items-center font-bold text-xl italic">
        <a href="/" className="flex items-center gap-1">
          <GiCoffeeBeans />
          <h1>
            Cini<span className="text-teal-700 italic">Kupi</span>
          </h1>
        </a>
      </div>
    </>
  );
};