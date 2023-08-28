import React from "react";
import { BsWhatsapp, BsInstagram, BsGithub } from 'react-icons/Bs';
import { SiGmail } from 'react-icons/Si';

const ContactForm = () => {
  const ProductsList = [{ name: "Coffe" }, { name: "Drink" }, { name: "Dessert" }];
  const InformationList = [{ information: "About Us" }, { information: "Delivery Information" }, { information: "Privacy Police" }, { information: "Contact Us" }];

  return (
    <footer class="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
      <div class="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 sm:justify-between">
        <div class="mr-12 hidden sm:block">
          <span className="text-teal-500 italic">Get connected with us on social networks :</span>
        </div>
        <div class="flex justify-center">
          <a href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500"><BsInstagram /></a>
          <a href="" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500"><BsWhatsapp /></a>
          <a href="" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500"><SiGmail /></a>
          <a href="" className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-slate-600 transition duration-500"><BsGithub /></a>
        </div>
      </div>
      <div class="container-fluid p-6 text-neutral-800 dark:text-neutral-200">
        <div class="grid gap-4 sm:grid-cols-2 justify-center">
          <div className="flex justify-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.4974205785314!2d107.6403575630262!3d-7.014136666683499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1693187020132!5m2!1sid!2sid" className="md:w-[525px] rounded-md" />
          </div>
          <div className="flex justify-center gap-5 md:gap-16">
            <div className="flex-col">
              <h6 className="mb-4 font-semibold uppercase text-teal-500 italic">Products</h6>
              {ProductsList.map((Product) => (
                <p className="mb-4 justify-start flex" key={Product.name}>
                  <a href="#!" className="hover:text-slate-500 transition duration-500">{Product.name}</a>
                </p>
              ))}
            </div>
            <div className="flex-col">
              <h6 className="mb-4 font-semibold uppercase text-teal-500 italic">information</h6>
              {InformationList.map((information) => (
                <p className="mb-4 justify-start flex" key={information.information}>
                  <a href="#!" className="hover:text-slate-500 transition duration-500">{information.information}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        © 2023 Copyright :{" "}
        <a class="text-neutral-800 dark:text-neutral-400" href="https://instagram.com/haniffthn__">
          Haniep Fathan Riziq
        </a>
      </div>
    </footer>
  );
};

export default ContactForm;
