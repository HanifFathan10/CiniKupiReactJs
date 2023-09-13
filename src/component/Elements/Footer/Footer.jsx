import React from "react";
import ListItems from "../ProductItems/ListItems/ListItems";
import Icon from "../Icon/Icon";
import NavigasiList from "../NavigasiBar/NavigasiList/NavigasiList";
import FooterList from "./FooterList/FooterList";
import InformationList from "./FooterList/InformationList/InformationList";

const ContactForm = () => {
  return (
    <footer class="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left z-[2]">
      <div class="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 sm:justify-between">
        <div class="mr-12 hidden sm:block">
          <span className="text-teal-500 italic">Get connected with us on social networks :</span>
        </div>
        <Icon />
      </div>
      <div class="container-fluid p-6 text-neutral-200">
        <div class="grid gap-4 sm:grid-cols-2 justify-center">
          <div className="flex justify-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.4974205785314!2d107.6403575630262!3d-7.014136666683499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1693187020132!5m2!1sid!2sid" className="md:w-[525px] rounded-md" />
          </div>
          <div className="flex justify-center gap-5 md:gap-16 mt-5">
            {/* Product */}
            <FooterList title="Product" item={<ListItems classnameLi="mb-4 underline-offset-2 rounded-lg hover:text-slate-500 cursor-pointer transition duration-500" classnameUl="text-start text-sm uppercase" />} />
            {/* Information */}
            <FooterList title="Information" item={<InformationList/>} />
            {/* Navigation */}
            <FooterList title="Navigation" item={<NavigasiList classnameLi="list-none mb-4 text-start text-neutral-200 text-sm" classnameA="hover:text-slate-500 transition duration-500" />} />
          </div>
        </div>
      </div>
      <div class="p-2 text-center bg-neutral-700 text-neutral-200 text-[10px] md:text-[12px]">
        © 2023 Copyright :{" "}
        <a class="text-neutral-800 dark:text-neutral-400" href="https://instagram.com/haniffthn__">
          Haniep Fathan Riziq
        </a>
      </div>
    </footer>
  );
};

export default ContactForm;
