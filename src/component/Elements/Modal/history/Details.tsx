import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import ModalInput from "../../InputForm/Modal";
import { rupiah } from "../../../../utils/rupiah";
import useFormatDate from "../../../../Hooks/useFormatDate";

interface DetailsProps {
  details: TDataHistoryTrx;
  setDetails: React.Dispatch<React.SetStateAction<TDataHistoryTrx>>;
}

const Details = ({ details, setDetails }: DetailsProps) => {
  const formatDateDetails = useFormatDate(details.createdAt, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return Object.keys(details).length ? (
    <ModalInput onClose={() => setDetails({})}>
      <div className="relative rounded-lg bg-white p-4 shadow">
        <div className=" flex items-end justify-between rounded-t">
          <h1 className="text-xl font-semibold">Detail Order</h1>
          <div>
            <button
              type="button"
              className="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => setDetails({})}
            >
              <XMarkIcon className="h-6 w-6" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
        <hr className="my-4 h-px rounded-md border-0 bg-gray-400" />
        <dl>
          <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
            <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900">
                Name
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                {details.order?.name}
              </dd>
            </div>
            <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900">
                Email
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                {details.order?.email}
              </dd>
            </div>
            <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900">
                Phone
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                {details.order?.phone}
              </dd>
            </div>
            <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900">
                Adress
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                {details.order?.address}
              </dd>
            </div>
            <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900">
                Total Price
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                {rupiah(details.order?.gross_amount!)}
              </dd>
            </div>
            <div>
              <dt className="mb-2 font-semibold leading-none text-gray-900">
                Time Order
              </dt>
              <dd className="mb-4 font-light text-gray-500 sm:mb-5">
                {formatDateDetails}
              </dd>
            </div>
          </div>

          <h2 className="mb-4 font-semibold text-gray-900">Total Items</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.item_details?.map((item, i) => (
              <div
                className="grid grid-cols-1 gap-y-4 rounded-lg border border-gray-200 bg-gray-100 p-3 font-semibold text-gray-800 sm:grid-cols-2"
                key={i}
              >
                <div>
                  <dt className="mb-2 font-semibold leading-none text-gray-900">
                    Product Name
                  </dt>
                  <dd className=" font-light text-gray-500">{item.name}</dd>
                </div>

                <div>
                  <dt className="mb-2 font-semibold leading-none text-gray-900">
                    Price
                  </dt>
                  <dd className=" font-light text-gray-500">
                    {rupiah(item.price!)}
                  </dd>
                </div>
                <div>
                  <dt className="mb-2 font-semibold leading-none text-gray-900">
                    Quantity
                  </dt>
                  <dd className=" font-light text-gray-500">{item.quantity}</dd>
                </div>
              </div>
            ))}
          </dl>
        </dl>
      </div>
    </ModalInput>
  ) : null;
};

export default Details;
