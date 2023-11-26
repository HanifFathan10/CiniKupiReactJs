import React from "react";
import Skeleton from 'react-loading-skeleton'

const ProductCOskeleton = () => {
  return (
    <section className="bg-[#1f3933] w-full min-h-screen grid grid-cols-1 items-center md:justify-center shadow-md shadow-gray-700">
      <div className="grid-cols-1 md:grid-cols-2 md:flex gap-3 justify-center items-center mt-28">
        <div className="w-full h-full p-2 flex justify-center items-center">
          <Skeleton circle width={200} height={200} />
        </div>
        <div className="flex w-full h-full flex-col justify-center max-md:items-center mt-10 md:mt-0 text-[#ffffff]">
          <Skeleton width={200} height={30} />
          <Skeleton width={120} height={20} />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-[#1e3932] text-[#ffffff] py-6 px-2 md:mt-10">
        <div className="md:w-4/5">
          <Skeleton width={80} height={35} />
          <Skeleton width={300} height={20} count={4} />
          <Skeleton width={160} height={20} />
          <div className="flex w-full justify-end">
            <Skeleton width={120} height={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCOskeleton;
