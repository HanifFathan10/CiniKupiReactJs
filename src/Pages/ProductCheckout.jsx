import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthDetail from "../component/Layouts/AuthDetail";
import ProductCOskeleton from "../component/Elements/CartOrder/ProductCOskeleton";
import ProdakSlide from "../component/Elements/ProductSlide/ProdakSlide";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import HeaderBack from "../component/Elements/HeaderBack";
import DetailProduct from "../component/Fragment/DetailProduct";
import { getMenuProductById } from "../services/product.service";

const ProductCheckout = () => {
  const { _id } = useParams();
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getMenuProductById(_id, (status, data) => {
        if (status === true) {
          setImages(data.data);
          setIsLoading(false);
        }
      });
    };

    fetchData();
  }, [_id]);

  return (
    <React.Fragment>
      <HeadMetaData
        title={images.name}
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
                image={images.image}
                name={images.name}
                fat={images.fat}
                calories={images.calories}
                descriptions={images.descriptions}
                price={images.price}
                sugar={images.sugar}
                key={images.id}
              />
              <div className="-mb-10 ml-4 mt-20 md:ml-10">
                <h1 className="w-fit border-b-4 border-green text-lg font-bold text-white">
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
