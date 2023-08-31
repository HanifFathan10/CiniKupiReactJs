import React from "react";

const ListImageDessert = () => {
  const images = [
    { src: "ImageDessert/dessert1.jpg", alt: "dessert1" },
    { src: "ImageDessert/dessert2.jpg", alt: "dessert2" },
    { src: "ImageDessert/dessert3.jpg", alt: "dessert3" },
    { src: "ImageDessert/dessert4.jpg", alt: "dessert4" },
    { src: "ImageDessert/dessert5.jpg", alt: "dessert5" },
    { src: "ImageDessert/dessert6.jpg", alt: "dessert6" },
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

export default ListImageDessert;
