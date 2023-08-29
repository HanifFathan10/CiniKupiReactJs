import React from "react";

const InformationList = () => {
  const InformationList = [{ information: "About Us" }, { information: "Delivery Information" }, { information: "Privacy Police" }, { information: "Contact Us" }];
  return (
    <>
      {InformationList.map((information) => (
        <p className="mb-4 text-start text-sm" key={information.information}>
          <a href="#!" className="hover:text-slate-500 transition duration-500 uppercase">
            {information.information}
          </a>
        </p>
      ))}
    </>
  );
};

export default InformationList;
