import * as React from "react";

type TTabButton = {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
};

const TabButton = ({ active, selectTab, children }: TTabButton) => {
  const buttonClasses = active
    ? "text-white border-b border-secondary"
    : "text-[#ADB7BE]";
  return (
    <button
      onClick={selectTab}
      className={`delay-125 text-md mr-3 cursor-pointer px-3 font-semibold italic text-teal-500 underline-offset-2 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-125 hover:text-teal-200 ${buttonClasses}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
