import React from "react";

const PartnerBusiness = ({ classname }) => {
  const PartnerBusiness = [{ bussines: "Suppliers" }, { bussines: "Corporate and Food service coffe" }, { bussines: "Landlord Support Center" }, { bussines: "Franchise" }];
  return (
    <>
      {PartnerBusiness.map((partner, index) => (
        <div className={`px-5 ${classname}`} key={index}>
          <p className="mb-4 text-start text-xs md:text-[14px]">
            <a href="#!" className="text-[#6b6b6b] hover:text-[#212121] hover:font-semibold transition duration-500 uppercase">
              {partner.bussines}
            </a>
          </p>
        </div>
      ))}
    </>
  );
};

export default PartnerBusiness;
