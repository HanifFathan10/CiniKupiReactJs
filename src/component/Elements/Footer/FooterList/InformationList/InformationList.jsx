import React from "react";

const InformationList = () => {
  const InformationList = [{ information: "About Us" }, { information: "Information" }, { information: "Privacy Police" }, { information: "Contact Us" }];
  return (
    <>
      {InformationList.map((information, index) => (
        <p className="mb-4 text-start text-xs md:text-[14px]" key={index}>
          <a href="#!" className="hover:text-slate-500 transition duration-500 uppercase">
            {information.information}
          </a>
        </p>
      ))}
    </>
  );
};

export default InformationList;
