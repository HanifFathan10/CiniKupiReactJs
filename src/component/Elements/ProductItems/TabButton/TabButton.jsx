import React from "react";

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-white border-b" : "text-[#ADB7BE]";
  return (
    <button onClick={selectTab} className={`mr-3 font-semibold px-3 italic ease-in-out delay-125 hover:-translate-y-1 hover:scale-125 text-md text-teal-500 underline-offset-2 rounded-lg hover:text-teal-200 cursor-pointer transition duration-500 ${buttonClasses}`}>
      {children}
    </button>
  );
};

export default TabButton;
