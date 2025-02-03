import React, { useEffect, useState } from "react";
import useDisplayProduct from "../../Store/DisplayProduct";
import { useShallow } from "zustand/react/shallow";

type Props = {};

const OurGallery = (props: Props) => {
  const [dplProduct, getDisplayProduct] = useDisplayProduct(
    useShallow((state) => [state.dplProduct, state.getDisplayProduct]),
  );
  const [shuffledImages, setShuffledImages] = useState<TDataDefaultMenu[]>([]);

  const shuffleArray = (array: TDataDefaultMenu[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    getDisplayProduct();
  }, []);

  useEffect(() => {
    if (dplProduct.length) {
      setShuffledImages(shuffleArray(dplProduct));
      const interval = setInterval(() => {
        setShuffledImages(shuffleArray(dplProduct));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [dplProduct]);

  return (
    <section className="relative flex justify-center py-12 max-xl:overflow-x-hidden">
      <div className="flex max-w-xl flex-col items-center gap-6 border-b-2 border-t-2 border-teriary p-6 sm:max-w-3xl md:max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-wide">Our Gallery</h1>
          <p className="text-center text-sm font-light tracking-wider md:text-base">
            Jelajahi keindahan dan kenikmatan dalam setiap sajian kami. Dari
            minuman segar yang penuh warna, kue tart yang menggoda, hingga kopi
            yang kaya aroma—setiap hidangan diciptakan dengan penuh dedikasi.
            Nikmati pengalaman kuliner yang memanjakan lidah dan memberikan
            kehangatan di setiap momen Anda.
          </p>
        </div>
        <div className="grid h-full w-full grid-cols-3 gap-2">
          {/* Kolom kiri (2 gambar vertikal) */}
          <div className="grid grid-rows-2 gap-2">
            {shuffledImages.slice(0, 2).map((product, i) => (
              <img
                key={i}
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>

          {/* Kolom tengah (1 gambar penuh) */}
          <div className="flex">
            {shuffledImages[2] && (
              <img
                src={shuffledImages[2].image}
                alt={shuffledImages[2].name}
                className="h-auto w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            )}
          </div>

          {/* Kolom kanan (2 gambar vertikal) */}
          <div className="grid grid-rows-2 gap-2">
            {shuffledImages.slice(3, 5).map((product, i) => (
              <img
                key={i}
                src={product.image}
                alt={product.name}
                className="h-56 w-full bg-center object-cover"
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
          <img
            src="/images/coffe-beans.png"
            alt="coffe-beans"
            width={0}
            height={0}
            loading="lazy"
            className="absolute hidden h-auto w-[260px] skew-x-6 lg:-left-36 lg:bottom-0 lg:block xl:-left-24"
            draggable={false}
          />
          <img
            src="/images/biji-coffe.png"
            alt="coffe-beans"
            width={0}
            height={0}
            loading="lazy"
            className="absolute top-0 h-auto rotate-12 md:-right-12 md:top-6 md:w-28 lg:right-0 lg:w-32 xl:w-36"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
