import React from "react";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

const CartSkeleton = () => {
  return (
    <>
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center overflow-hidden rounded-full">
            <SkeletonCircle size="24" startColor="#444" endColor="#202020" />
          </div>
          <Skeleton
            width={120}
            height={4}
            startColor="#444"
            endColor="#202020"
            rounded={6}
          />
        </div>
      </div>
      <div className="mb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center overflow-hidden rounded-full">
            <SkeletonCircle size="24" startColor="#444" endColor="#202020" />
          </div>
          <Skeleton
            width={120}
            height={4}
            startColor="#444"
            endColor="#202020"
            rounded={6}
          />
        </div>
      </div>
    </>
  );
};

export default CartSkeleton;
