import React from "react";
import ModalInput from "../../InputForm/Modal";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { DeleteHistoryTransactionByOrderId } from "../../../../services/payment.service";
import { useCustomToast } from "../../../../Hooks/useToast";

interface CancelProps {
  cancel: TDataHistoryTrx;
  setCancel: React.Dispatch<React.SetStateAction<TDataHistoryTrx>>;
}

const Cancel = ({ cancel, setCancel }: CancelProps) => {
  const Navigate = useNavigate();
  const { SuccessToast } = useCustomToast();

  const handleCancelTransaction = async (order_id: string) => {
    await DeleteHistoryTransactionByOrderId(order_id, (status, res) => {
      if (status) {
        localStorage.removeItem("pendingTransaction");
        setCancel({});
        Navigate("/history-transaction", {
          preventScrollReset: true,
          replace: true,
        });
        SuccessToast({
          id: "cancel",
          title: res.data.message,
        });
      }
    });
  };

  return Object.keys(cancel).length ? (
    <ModalInput onClose={() => setCancel({})}>
      <div className="relative mx-auto w-fit rounded-lg bg-white p-4 text-center shadow sm:p-5">
        <button
          type="button"
          onClick={() => setCancel({})}
          className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
        >
          <XMarkIcon className="h-5 w-5" />
          <span className="sr-only">Close modal</span>
        </button>
        <TrashIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-4 text-gray-500 ">
          Are you sure you want to delete{" "}
          <span className="font-bold text-neutral-600" />
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCancel({})}
            type="button"
            className="focus:ring-primary-300 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4"
          >
            No, cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => handleCancelTransaction(cancel.order!.order_id!)}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </ModalInput>
  ) : null;
};

export default Cancel;
