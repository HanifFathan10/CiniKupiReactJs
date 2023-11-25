import React from "react";
import Skeleton from "react-loading-skeleton";

const CartSkeleton = () => {
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-5 rounded-full h-24 w-24 md:h-28 md:w-28 overflow-hidden">
            <Skeleton circle width={120} height={120} />
          </div>
          <Skeleton width={120} height={20} />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-5 rounded-full h-24 w-24 md:h-28 md:w-28 overflow-hidden">
            <Skeleton circle width={120} height={120} />
          </div>
          <Skeleton width={120} height={20} />
        </div>
      </div>
    </>
  );
};

export default CartSkeleton;
