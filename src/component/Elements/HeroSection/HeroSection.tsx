import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex aspect-video h-[680px] w-full items-center justify-center rounded-b-xl bg-hero-pattern bg-cover bg-center px-8 py-10 text-white">
      <div className="absolute inset-0 h-[calc(100%-340px)] bg-gradient-to-b from-black/60 to-transparent" />
      <div className="md:ml-10">
        <div className="md:ml-0">
          <h1 className="my-3 text-6xl font-bold italic tracking-wide underline lg:text-7xl xl:text-[86px] 2xl:text-[92px]">
            Cini<span className="text-teriary">Kupi</span>
          </h1>
          <p className="text-xs font-extralight italic leading-3 2xl:text-base">
            Jangan lupa <span className="font-bold text-teriary">ngopi</span>{" "}
            ^_^
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
