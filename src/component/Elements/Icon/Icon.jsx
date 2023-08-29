import React from "react";
import { BsWhatsapp, BsInstagram, BsGithub } from "react-icons/Bs";
import { SiGmail } from "react-icons/Si";

const Icon = () => {
  return (
    <div class="flex justify-center">
      <a href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500">
        <BsInstagram />
      </a>
      <a href="" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500">
        <BsWhatsapp />
      </a>
      <a href="" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500">
        <SiGmail />
      </a>
      <a href="" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500">
        <BsGithub />
      </a>
    </div>
  );
};

export default Icon;
