import React from "react";

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}

const TabButton = ({ active, selectTab, children }: TabButtonProps) => {
  const buttonClasses = active
    ? "text-white outline-2 border-b"
    : "text-slate-400";
  return (
    <button
      onClick={selectTab}
      className={`delay-125 text-md hover:border-teriary mr-3 cursor-pointer border-solid px-3 font-semibold italic text-neutral-400 underline-offset-2 transition duration-300 hover:text-neutral-200 hover:no-underline ${buttonClasses} border-solid hover:border-b hover:outline-2`}
    >
      {children}
    </button>
  );
};

export default TabButton;
