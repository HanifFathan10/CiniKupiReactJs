import React from "react";

const PartnerBusiness = ({ classname }) => {
  const PartnerBusiness = [
    { bussines: "Suppliers" },
    { bussines: "Corporate and Food service coffe" },
    { bussines: "Landlord Support Center" },
    { bussines: "Franchise" },
  ];
  return (
    <>
      {PartnerBusiness.map((partner, index) => (
        <div className={`px-5 ${classname}`} key={index}>
          <p className="mb-4 text-start text-xs md:text-[14px]">
            <a
              href="#!"
              className="uppercase text-[#6b6b6b] transition duration-500 hover:font-semibold hover:text-[#212121]"
            >
              {partner.bussines}
            </a>
          </p>
        </div>
      ))}
    </>
  );
};

export default PartnerBusiness;
