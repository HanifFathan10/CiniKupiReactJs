import React from "react";
import SocialMedia from "../Icon/SocialMedia";
import FooterList from "./FooterList/FooterList";

const ContactForm = () => {
  return (
    <footer className="z-[2] bg-[#ffffff] text-[#212121] lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-neutral-300 p-6 sm:justify-between">
        <div className="mr-12 hidden lg:block">
          <span className="italic">
            Get connected with us on social networks :
          </span>
        </div>
        <SocialMedia />
      </div>
      <div className="w-full ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="hidden justify-center rounded-sm border lg:block">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.4974205785314!2d107.6403575630262!3d-7.014136666683499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1693187020132!5m2!1sid!2sid"
              className="p-1 md:h-full md:w-full"
              allowFullScreen
              loading="lazy"
              title="CiniKupi"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-5 flex flex-col">
            <FooterList title="Information" id="InformationList" />
            <FooterList title="Order and Pick Up" id="PickUp" />
            <FooterList title="For business partner" id="PartnerBusiness" />
          </div>
        </div>
      </div>
      <div className="bg-[#212121] p-5 text-center text-[10px] text-[#ffffff] md:text-[12px]">
        © 2024{" "}
        <span className="italic">
          Cini<span className="text-neutral-400">Kupi</span>
        </span>{" "}
        Coffe Company. All rights reserved
      </div>
    </footer>
  );
};

export default ContactForm;
