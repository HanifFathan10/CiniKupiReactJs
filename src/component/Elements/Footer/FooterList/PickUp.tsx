import React from "react";

const PickUp = ({ classname }: { classname?: string }) => {
  const PickUpList = [
    { pickup: "Order on the Web" },
    { pickup: "Delivery" },
    { pickup: "Order and Pick Up Options" },
    { pickup: "Explore and Find Coffee for Home" },
    { pickup: "Contact Us" },
  ];
  return (
    <>
      {PickUpList.map((list, index) => (
        <div className={`px-5 ${classname}`} key={index}>
          <p className="mb-4 text-start text-xs md:text-[14px]">
            <a
              href="#!"
              className="uppercase text-[#6b6b6b] transition duration-500 hover:font-semibold hover:text-[#212121]"
            >
              {list.pickup}
            </a>
          </p>
        </div>
      ))}
    </>
  );
};

export default PickUp;
