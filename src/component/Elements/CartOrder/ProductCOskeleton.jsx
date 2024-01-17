import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductCOskeleton = () => {
  return (
    <section className="bg-[#1f3933] w-full min-h-screen grid grid-cols-1 items-center md:justify-center shadow-md shadow-gray-700">
      <div className="grid-cols-1 md:grid-cols-2 md:flex gap-3 justify-center items-center mt-28">
        <div className="w-full h-full p-2 flex justify-center items-center">
          <SkeletonCircle size={44} />
        </div>
        <div className="flex w-full h-full flex-col justify-center gap-y-3 max-md:items-center mt-10 md:mt-0 text-[#ffffff]">
          <Skeleton width={60} height={8} />
          <Skeleton width={40} height={5} />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center md:items-center bg-[#1e3932] text-[#ffffff] py-6 px-2 md:mt-10">
        <div className="md:w-4/5 space-y-3">
          <Skeleton width={32} height={8} />
          <SkeletonText width={40} />
          <Skeleton width={40} height={4} />
          <div className="flex w-full justify-end">
            <Skeleton width={40} height={14} rounded={30} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCOskeleton;
