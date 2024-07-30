import React from "react";

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-white border-b border-secondary"
    : "text-slate-400";
  return (
    <button
      onClick={selectTab}
      className={`delay-125 text-md mr-3 cursor-pointer px-3 font-semibold italic text-neutral-400 underline-offset-2 transition duration-300 hover:border-b hover:border-secondary hover:text-neutral-200 hover:no-underline ${buttonClasses}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
