import React from "react";

const PickUp = ({ classname }) => {
  const PickUpList = [{ pickup: "Order on the Web" }, { pickup: "Delivery" }, { pickup: "Order and Pick Up Options" }, { pickup: "Explore and Find Coffee for Home" }, { pickup: "Contact Us" }];
  return (
    <>
      {PickUpList.map((list, index) => (
        <div className={`px-5 ${classname}`} key={index}>
          <p className="mb-4 text-start text-xs md:text-[14px]">
            <a href="#!" className="text-[#6b6b6b] hover:text-[#212121] hover:font-semibold transition duration-500 uppercase">
              {list.pickup}
            </a>
          </p>
        </div>
      ))}
    </>
  );
};

export default PickUp;
