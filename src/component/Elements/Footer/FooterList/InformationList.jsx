import React from "react";

const InformationList = ({classname}) => {
  const InformationList = [{ information: "Our Company" }, { information: "Our Coffe" }, { information: "Stories and News" }, { information: "Customer Service" }, { information: "Contact Us" }];
  return (
    <>
      {InformationList.map((information, index) => (
        <div className={`px-5 ${classname}`} key={index}>
          <p className="mb-4 text-start text-xs md:text-[14px]">
            <a href="#!" className="text-[#6b6b6b] hover:text-[#212121] hover:font-semibold transition duration-500 uppercase">
              {information.information}
            </a>
          </p>
        </div>
      ))}
    </>
  );
};

export default InformationList;
