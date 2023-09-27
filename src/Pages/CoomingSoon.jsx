import React from "react";
import { Link } from "react-router-dom";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const CoomingSoon = () => {
  return (
    <>
      <HeadMetaData title="CoomingSoon" metaDescription="CoomingSoon Page by CiniKupi" />
      <section className="w-full min-h-screen flex justify-center items-center bg-slate-700">
        <div className="flex flex-col items-center">
          <img src="imageError/coomingsoon.png" />
          <p className="text-[10px] font-semibold mt-10">Mau belajar dulu bikin sistem ordernya, Doain aja hehe ^_^</p>
          <Link to="/" className="flex text-sm justify-center items-center gap-2 text-lime-500 mt-3">
            Back Home{" "}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CoomingSoon;
