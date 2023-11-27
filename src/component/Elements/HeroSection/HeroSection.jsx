import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen flex items-center text-white px-8 py-10 bg-center bg-hero-pattern bg-cover">
      <div className="md:ml-10">
        <div className="max-w-xs md:max-w-sm md:ml-0 justify-center">
          <h2 className="text-sm md:text-[14px] italic text-zinc-300 uppercase font-semibold">Lebih jujur pahitnya kopi daripada ucapanmu</h2>
          <h1 className="text-5xl md:text-6xl font-bold italic my-3">
            Cini<span className="text-zinc-500">Kupi</span>
          </h1>
          <p className="text-xs md:text-sm font-mono mb-3">Mari menikmati secangkir kopi, seperti halnya sebuah kopi, semahal dan seindah apapun tampilannya dalam sebuah cangkir. tak akan bisa menyembunyikan rasa pahit.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
