import * as React from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductCOskeleton = () => {
  return (
    <section className="grid min-h-screen w-full grid-cols-1 items-center bg-[#1f3933] shadow-md shadow-gray-700 md:justify-center">
      <div className="mt-28 grid-cols-1 items-center justify-center gap-3 md:flex md:grid-cols-2">
        <div className="flex h-full w-full items-center justify-center p-2">
          <SkeletonCircle size="44" />
        </div>
        <div className="mt-10 flex h-full w-full flex-col justify-center gap-y-3 text-[#ffffff] max-md:items-center md:mt-0">
          <Skeleton width={60} height={8} />
          <Skeleton width={40} height={5} />
        </div>
      </div>
      <div className="flex w-full flex-col justify-center bg-[#1e3932] px-2 py-6 text-[#ffffff] md:mt-10 md:items-center">
        <div className="space-y-3 md:w-4/5">
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
