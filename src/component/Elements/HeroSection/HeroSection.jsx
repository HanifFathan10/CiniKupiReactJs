import React from "react";

const HeroSection = () => {
  return (
    <div className="flex min-h-screen w-full items-center bg-hero-pattern bg-cover bg-center px-8 py-10 text-white">
      <div className="md:ml-10">
        <div className="max-w-xs justify-center md:ml-0 md:max-w-sm">
          <h2 className="text-sm font-semibold uppercase italic text-zinc-300 md:text-[14px]">
            Lebih jujur pahitnya kopi daripada ucapanmu
          </h2>
          <h1 className="my-3 text-5xl font-bold italic md:text-6xl">
            Cini<span className="text-zinc-500">Kupi</span>
          </h1>
          <p className="mb-3 font-mono text-xs md:text-sm">
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
