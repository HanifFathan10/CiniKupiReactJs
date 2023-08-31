import React from "react";

const ListImageDrink = () => {
  const images = [
    { src: "ImageDrink/drink1.jpg", alt: "drink1" },
    { src: "ImageDrink/drink2.jpg", alt: "drink2" },
    { src: "ImageDrink/drink3.jpg", alt: "drink3" },
    { src: "ImageDrink/drink4.jpg", alt: "drink4" },
    { src: "ImageDrink/drink5.jpg", alt: "drink5" },
    { src: "ImageDrink/drink6.jpg", alt: "drink6" },
  ];
  return (
    <div className="flex justify-center">
      <div className="flex gap-3">
        <div className="grid grid-cols-3 text-black gap-3">
          {images.map((image) => (
            <img key={image.alt} src={image.src} alt={image.alt} className="h-full w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListImageDrink;
