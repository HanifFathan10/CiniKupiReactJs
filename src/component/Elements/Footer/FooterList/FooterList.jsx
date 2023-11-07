import React from "react";

const FooterList = ({ title, item }) => {
  return (
    <div className="flex-col">
      <h6 className="mb-4 text-xs md:text-base text-start font-semibold uppercase text-teal-500 italic">{title}</h6>
      <div>{item}</div>
    </div>
  );
};

export default FooterList;
