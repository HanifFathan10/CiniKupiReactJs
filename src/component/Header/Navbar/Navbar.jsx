import { useState } from "react";
import { GiCoffeeBeans } from 'react-icons/Gi';

const Navbar = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "PRODUCT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];

  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="shadow-lg w-full fixed top-0 left-0 border-b-slate-600">
        <div className="md:flex items-center justify-between py-4 px-7 md:px-10">
          <div className="flex gap-2 text-lg">
            <GiCoffeeBeans />
            <h3>Cini<span className="text-teal-500 italic">Kupi</span></h3>
          </div>
          <div onClick={()=> setOpen(!open)} className="text-2xl absolute right-8 top-4 cursor-pointer md:hidden">
            <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
          </div>
          <ul className={`md:flex md:items-center bg-slate-500  max-w-[164px] text-xs md:text-md md:pb-0 pb-8 absolute md:max-w-full md:static md:z-auto right-4 w-full md:w-auto md:bg-transparent rounded-lg md:pl-0 pl-6 transition-all duration-500 ease-in-out ${open ? 'top-20 opacity-100' : 'top-[490px] opacity-0 md:opacity-100'}`}>
            {Links.map((Link) => (
              <li key={Link.name} className="md:ml-8 md:my-0 my-5 ">
                <a href={Link.link} className=" text-md font-semibold px-2 hover:text-slate-600 duration-500">
                  {Link.name}
                </a>
              </li>
            ))}
            <a href="/" className="p-2 text-xl md:mx-2">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
