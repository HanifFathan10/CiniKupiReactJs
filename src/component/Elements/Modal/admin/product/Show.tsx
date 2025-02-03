import React from "react";
import ModalInput from "../../../InputForm/Modal";
import { rupiah } from "../../../../../utils/rupiah";
import { XMarkIcon } from "@heroicons/react/24/solid";

type TShow = {
  show: TDataSingleProduct;
  setShow: React.Dispatch<React.SetStateAction<TDataSingleProduct>>;
};

const Show = ({ show, setShow }: TShow) => {
  return Object.keys(show).length ? (
    <ModalInput onClose={() => setShow({})}>
      <div className="relative rounded-lg bg-white p-4 shadow  sm:p-5">
        <div className="mb-4 flex justify-between rounded-t sm:mb-5">
          <div className="flex items-center gap-4">
            <div className="w-auto rounded-lg bg-gray-200 p-2">
              <img
                src={show.image}
                alt={show.name}
                width={100}
                height={100}
                className="h-16 w-16 bg-cover bg-center object-contain"
              />
            </div>
            <div className="text-lg text-gray-900">
              <h3 className="font-bold ">{show.name}</h3>
              <p className="text-base font-semibold">{rupiah(show.price)}</p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => setShow({})}
            >
              <XMarkIcon className="h-6 w-6" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 ">
            Descriptions
          </dt>
          <dd className="mb-4 font-light text-gray-500  sm:mb-5">
            {show.description}
          </dd>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
              <dt className="mb-2 font-semibold leading-none text-gray-900 ">
                Calories
              </dt>
              <dd className=" font-light text-gray-500 ">{show.calories}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
              <dt className="mb-2 font-semibold leading-none text-gray-900 ">
                Sugar
              </dt>
              <dd className=" font-light text-gray-500 ">{show.sugar}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
              <dt className="mb-2 font-semibold leading-none text-gray-900 ">
                Fat
              </dt>
              <dd className=" font-light text-gray-500 ">{show.fat}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-semibold text-gray-800">
              <dt className="mb-2 font-semibold leading-none text-gray-900 ">
                Oz
              </dt>
              <dd className=" font-light text-gray-500 ">{show.oz}</dd>
            </div>
          </dl>
        </dl>
      </div>
    </ModalInput>
  ) : null;
};

export default Show;
