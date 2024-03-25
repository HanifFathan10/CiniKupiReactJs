import React from "react";
import InformationList from "./InformationList";
import PickUp from "./PickUp";
import PartnerBusiness from "./PartnerBusiness";
import { Collapse, useDisclosure } from "@chakra-ui/react";

const FooterList = ({ title, id }) => {
  const { isOpen, onToggle } = useDisclosure();

  const LIST_TAB = [
    {
      id: "InformationList",
      content: <InformationList />,
    },
    {
      id: "PickUp",
      content: <PickUp />,
    },
    {
      id: "PartnerBusiness",
      content: <PartnerBusiness />,
    },
  ];

  return (
    <div id={id} className="cursor-pointer">
      <div onClick={onToggle} className="my-5 flex justify-between px-5">
        <h6 className="font-base uppercase italic text-black">{title}</h6>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        {LIST_TAB.map(
          (listTab) =>
            id === listTab.id && (
              <Collapse
                in={isOpen}
                key={listTab.id}
                animateOpacity
                transition={{ enter: { duration: 0.5 } }}
              >
                {listTab.content}
              </Collapse>
            ),
        )}
      </div>
    </div>
  );
};
export default FooterList;
