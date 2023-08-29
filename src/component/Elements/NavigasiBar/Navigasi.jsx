import React from "react";
import { useState } from "react";
import NavigasiList from "./NavigasiList/NavigasiList";

const Navigasi = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(!open)} className="text-2xl absolute right-8 top-4 cursor-pointer md:hidden">
        <ion-icon name={open ? "close" : "menu"}></ion-icon>
      </div>
      <ul className={`md:flex md:items-center bg-slate-500  max-w-[164px] text-sm md:text-md md:pb-0 pb-2 absolute md:max-w-full md:static md:z-auto right-4 w-full md:w-auto md:bg-transparent rounded-lg md:pl-0 pl-6 transition-all duration-500 ease-in-out ${open ? "top-20 opacity-100" : "top-[490px] opacity-0 md:opacity-100"}`}>
        <NavigasiList classnameLi="md:ml-8 md:my-0 my-5" classnameA="text-md font-semibold px-2 hover:text-slate-600 duration-500"/>
      </ul>
    </>
  );
};

export default Navigasi;
