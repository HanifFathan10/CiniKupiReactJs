import React from "react";
import HeroImage from "./hero-pattern.jpg";

const HeroSection = () => {
  const bgImageStyle = {
    backgroundImage: `url("${HeroImage}")`,
    backgroundSize: "cover",
    height: "100vh",
  };
  return (
    <div className="w-full min-h-screen flex items-center text-white px-8 py-10 bg-center" style={bgImageStyle}>
      <div className="md:ml-10">
        <div className="max-w-xs md:max-w-sm md:ml-0 justify-center">
          <h2 className="text-sm md:text-lg text-zinc-300 uppercase font-bold my-">Hai Dog, ini web CiniKupi yeayyy</h2>
          <h1 className="text-5xl md:text-6xl font-bold italic my-3">
            Cini<span className="text-zinc-500">Kupi</span>
          </h1>
          <p className="text-xs md:text-sm font-mono mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus ex nobis illo quod odit earum fugit a voluptate eveniet consequuntur.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
