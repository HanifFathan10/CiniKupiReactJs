import React from "react";
import ListItems from "../ProductItems/ListItems/ListItems";
import Icon from "../Icon/Icon";
import NavigasiList from "../NavigasiBar/NavigasiList/NavigasiList";
import FooterList from "./FooterList/FooterList";
import InformationList from "./FooterList/InformationList/InformationList";

const ContactForm = () => {
  return (
    <footer className="text-center text-[#212121] bg-[#fcfcfcbe] lg:text-left z-[2]">
      <div className="flex items-center justify-center border-b-2 border-neutral-300 p-6 sm:justify-between">
        <div className="mr-12 hidden md:block">
          <span className="italic">Get connected with us on social networks :</span>
        </div>
        <Icon />
      </div>
      <div className="px-6">
        <div className="grid gap-4 sm:grid-cols-2 justify-center">
          <div className="hidden md:block justify-center border rounded-sm">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.4974205785314!2d107.6403575630262!3d-7.014136666683499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1693187020132!5m2!1sid!2sid" className="md:w-full md:h-full p-1" />
          </div>
          <div className="flex justify-evenly gap-5 md:gap-8 mt-5">
            {/* Product */}
            <FooterList title="Product" item={<ListItems classnameLi="mb-4 rounded-lg hover:text-slate-500 cursor-pointer transition duration-500" classnameUl="text-xs md:text-[14px] uppercase text-start" />} />
            {/* Information */}
            <FooterList title="Information" item={<InformationList />} />
            {/* Navigation */}
            <FooterList title="Navigation" item={<NavigasiList classnameLi="list-none mb-4 text-start text-xs md:text-[14px]" classnameA="hover:text-slate-500 transition duration-500" />} />
          </div>
        </div>
      </div>
      <div className="p-3 text-center text-[#ffffff] bg-[#212121] text-[10px] md:text-[12px]">
        © 2023 Copyright :{" "}
        <a className="" href="https://instagram.com/haniffthn__">
          Haniep Fathan Riziq
        </a>
      </div>
    </footer>
  );
};

export default ContactForm;
