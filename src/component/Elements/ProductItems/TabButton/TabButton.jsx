import React from "react";

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-white border-b border-secondary no-underline"
    : "text-neutral-400 underline";
  return (
    <button
      onClick={selectTab}
      className={`delay-125 text-md mr-3 cursor-pointer px-3 font-semibold italic text-teal-500 underline-offset-2 transition duration-300 hover:text-teal-200 ${buttonClasses}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
