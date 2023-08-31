import React from "react";

const ListImageCoffe = () => {
  const images = [
    { src: "ImageCoffe/coffe1.jpg", alt: "coffe1" },
    { src: "ImageCoffe/coffe2.jpg", alt: "coffe2" },
    { src: "ImageCoffe/coffe3.jpg", alt: "coffe3" },
    { src: "ImageCoffe/coffe4.jpg", alt: "coffe4" },
    { src: "ImageCoffe/coffe5.jpg", alt: "coffe5" },
    { src: "ImageCoffe/coffe6.jpg", alt: "coffe6" },
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

export default ListImageCoffe;
