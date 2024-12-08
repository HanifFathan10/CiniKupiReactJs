import React from "react";
import { useParams } from "react-router-dom";
import AuthDetail from "../component/Layouts/AuthDetail";
import ProductCOskeleton from "../component/Elements/CartOrder/ProductCOskeleton";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HeaderBack from "../component/Elements/HeaderBack";
import DetailProduct from "../component/Fragment/DetailProduct";
import useProductStore from "../Store/ProductStore";

const ProductCheckout = () => {
  const { _id } = useParams();
  const [products, isLoading] = useProductStore((state) => [
    state.products,
    state.isLoading,
  ]);
  const product = products.find((val) => val._id === _id);

  return (
    <React.Fragment>
      <HeadMetaData
        title={product.name}
        metaDescription="Checkout page by CiniKupi"
      />
      <AuthDetail>
        <div className="container mx-auto">
          {isLoading ? (
            <ProductCOskeleton />
          ) : (
            <section className="grid min-h-screen w-full grid-cols-1 items-center bg-chocolate md:justify-center">
              <HeaderBack className="mt-[75px]" title="Detail Product" />
              <DetailProduct
                _id={_id}
                image={product.image}
                name={product.name}
                fat={product.fat}
                calories={product.calories}
                descriptions={product.descriptions}
                price={product.price}
                sugar={product.sugar}
                oz={product.oz}
                key={product._id}
              />
              <div className="-mb-10 ml-4 mt-20 md:ml-10">
                <h1 className="w-fit border-b-4 border-green-700 text-lg font-bold text-white">
                  Recommended Product
                </h1>
              </div>
              <ProdakSlide />
            </section>
          )}
        </div>
      </AuthDetail>
    </React.Fragment>
  );
};

export default ProductCheckout;
