import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNestedMenuById } from "../services/Menu.service";
import AuthDetail from "../component/Layouts/AuthDetail";
import ProductCOskeleton from "../component/Elements/CartOrder/ProductCOskeleton";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HeaderBack from "../component/Elements/HeaderBack";
import DetailProduct from "../component/Fragment/DetailProduct";

const ProductCheckout = () => {
  const { _id } = useParams();
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNestedMenuById(_id, (data) => {
      setImages(data.product[0]);
      setIsLoading(false);
    });
  }, [_id]);

  return (
    <>
      <HeadMetaData
        title={images.name}
        metaDescription="Checkout page by CiniKupi"
      />
      <AuthDetail>
        <div className="container mx-auto">
          {isLoading ? (
            <ProductCOskeleton />
          ) : (
            <section className="grid min-h-screen w-full grid-cols-1 items-center bg-primary md:justify-center">
              <HeaderBack className="mt-[75px]" title="Detail Product" />
              <DetailProduct
                _id={_id}
                image={images.image}
                name={images.name}
                fat={images.fat}
                calories={images.calories}
                descriptions={images.descriptions}
                price={images.price}
                sugar={images.sugar}
                key={images.id}
              ></DetailProduct>
              <div className="-mb-10 ml-4 mt-20 md:ml-10">
                <h1 className="w-fit border-b-4 border-green text-lg font-bold text-light">
                  Recommended Product
                </h1>
              </div>
              <ProdakSlide />
            </section>
          )}
        </div>
      </AuthDetail>
    </>
  );
};

export default ProductCheckout;
