import React from "react";

const HeroSection = () => {
  return (
    <div className="flex min-h-screen w-full items-center bg-hero-pattern bg-cover bg-center px-8 py-10 text-white">
      <div className="md:ml-10">
        <div className="w-[80vw] max-w-sm md:ml-0 md:max-w-sm">
          <h2 className="text-sm font-semibold uppercase italic tracking-wide text-zinc-200 lg:text-sm xl:text-base">
            Lebih jujur pahitnya kopi daripada ucapanmu
          </h2>
          <h1 className="my-3 text-5xl font-bold italic lg:text-6xl xl:text-7xl">
            Cini<span className="text-teal-700">Kupi</span>
          </h1>
          <p className="mb-3 font-mono text-xs leading-normal tracking-tight text-zinc-100 max-sm:backdrop-blur-sm md:text-sm xl:text-base">
            Mari menikmati secangkir kopi, seperti halnya sebuah kopi, semahal
            dan seindah apapun tampilannya dalam sebuah cangkir. tak akan bisa
            menyembunyikan rasa pahit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
