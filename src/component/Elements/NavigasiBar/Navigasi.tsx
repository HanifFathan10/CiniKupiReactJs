import React, { useEffect } from "react";
import { useState } from "react";
import NavigasiList from "./NavigasiList/NavigasiList";

const Navigasi = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest(".toggle-button") === null
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleToggleClick = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <div
        onClick={handleToggleClick}
        className="toggle-button absolute right-7 top-6 flex cursor-pointer flex-col text-2xl md:hidden"
      >
        <span
          className={`my-[2px] h-[4px] w-6 bg-white transition-all duration-300 ${
            open && "origin-top-left rotate-45"
          }`}
        ></span>
        <span
          className={`my-[2px] h-[4px] w-6 bg-white transition-all duration-300 ${
            open && "scale-0"
          }`}
        ></span>
        <span
          className={`my-[2px] h-[4px] w-6 bg-white transition-all duration-300 ${
            open && "origin-bottom-left -rotate-45"
          }`}
        ></span>
      </div>
      <ul
        className={`md:text-md absolute right-2 flex w-full max-w-[125px] justify-center rounded-xl bg-[#212121] p-4 text-sm transition-all duration-700 ease-in-out max-md:flex-col md:static md:z-auto md:w-auto md:max-w-full md:items-center md:bg-transparent md:p-0 ${
          open ? " top-20" : " left-[700px] opacity-0 md:opacity-100"
        }`}
      >
        <NavigasiList />
      </ul>
    </>
  );
};

export default Navigasi;
