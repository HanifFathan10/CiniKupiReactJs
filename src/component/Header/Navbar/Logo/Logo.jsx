import React from "react";

export const Logo = () => {
  return (
    <>
      <div className="flex items-center font-bold text-xl italic">
        <a href="/" className="flex items-center gap-1">
          <ion-icon name="cafe"></ion-icon>
          <h1>
            Cini<span className="text-teal-700">Kupi</span>
          </h1>
        </a>
      </div>
    </>
  );
};
