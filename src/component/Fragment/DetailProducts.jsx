import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImageById } from "../../services/product.service";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from '../Elements/Footer/Footer';

const DetailProducts = (props) => {
  const { id } = useParams();
  const [images, setImages] = useState({});

  useEffect(() => {
    getImageById(id, (data) => {
      setImages(data);
    });
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-slate-300">
        <div className="-mb-20 z-[1] mt-10">
          <img src={images.image} alt={images.category} className="w-[180px] rounded-full shadow-md" />
        </div>
        <div className="flex flex-col justify-center max-w-xs bg-slate-500 rounded-md">
          <div className="pt-24 mb-4 px-6 flex flex-col justify-center items-center">
            <h1 className="text-md font-bold">{images.name}</h1>
            <h3 className="text-xs italic mb-3">{images.price}</h3>
            <p className="text-xs ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio vel distinctio, eius nam eveniet placeat maiores porro. Animi, dolorum eum?</p>
            <Link to="/" className="text-sm font-bold bg-emerald-300 px-3 py-1 rounded-lg mt-2 font-sans">
              Order Here!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProducts;
