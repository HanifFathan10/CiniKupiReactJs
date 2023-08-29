import React from "react";

const ListImages = () => {
  const images = [
    { src: "images/2.jpg", alt: "coffe2" },
    { src: "images/3.jpg", alt: "coffe3" },
    { src: "images/4.jpg", alt: "coffe4" },
    { src: "images/5.jpg", alt: "coffe5" },
  ];
  return (
    <div className="flex justify-center">
      <div className="flex gap-3">
        <div className="grid grid-cols-1">
          <img src="images/1.jpg" alt="coffe1" className="h-full w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-2 text-black gap-3">
          {images.map((image) => (
            <img key={image.alt} src={image.src} alt={image.alt} className="h-full w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListImages;
