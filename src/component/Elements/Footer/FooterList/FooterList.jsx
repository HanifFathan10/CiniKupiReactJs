import React, { useState } from "react";
import InformationList from "./InformationList";
import PickUp from "./PickUp";
import PartnerBusiness from "./PartnerBusiness";

const FooterList = ({ title, id }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const [pickUp, setPickUp] = useState(false);
  const [partner, setPartner] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setInfo(!info);
    setPickUp(!pickUp);
    setPartner(!partner);
  };

  const LIST_TAB = [
    {
      id: "InformationList",
      content: <InformationList classname={info ? "-z-0 relative" : "-z-20 hidden"} />,
    },
    {
      id: "PickUp",
      content: <PickUp classname={pickUp ? "-z-0 relative" : "-z-20 hidden"} />,
    },
    {
      id: "PartnerBusiness",
      content: <PartnerBusiness classname={partner ? "-z-0 relative" : "-z-20 hidden"} />,
    },
  ];

  return (
    <div id={id} className="cursor-pointer">
      <div onClick={handleOpen} className="flex px-5 my-5 justify-between">
        <h6 className="font-base uppercase text-black italic">{title}</h6>
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </div>
      <div className="flex flex-col">
        {LIST_TAB.map((listTab) => id === listTab.id && <div key={listTab.id}>{listTab.content}</div>)}
      </div>
    </div>
  );
};

export default FooterList;
