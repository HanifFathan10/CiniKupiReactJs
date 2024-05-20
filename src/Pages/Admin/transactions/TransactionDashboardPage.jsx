import React, { useEffect } from "react";
import { HeadMetaData } from "../../../component/Elements/HeadMetaData";
import AdminLayouts from "../../../component/Layouts/AdminLayouts";
import ModalInput from "../../../component/Elements/InputForm/Modal";
import {
  DeleteHistoryTransaction,
  getAllHistoryTransaction,
} from "../../../services/PaymentService";
import { rupiah } from "../../../Hooks/useRupiah";
import { TrashIcon } from "@heroicons/react/24/outline";

const TransactionDashboardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [deleted, setDeleted] = React.useState({});

  useEffect(() => {
    getAllHistoryTransaction((status, res) => {
      if (status === true) {
        setUsers(res.data);
      }
    });
  }, [deleted]);

  const handleDeleteUser = async (_id) => {
    await DeleteHistoryTransaction(_id, (status, res) => {
      if (status === true) {
        setDeleted({});
      }
    });
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Users Dashboard" description="users dashboard" />
      <AdminLayouts>
        <div className="h-full w-full overflow-auto rounded-s-xl bg-white p-5 text-black">
          <table className="min-w-full table-auto rounded-md text-center text-sm font-light">
            <thead className="border-b border-dark font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">
                  No
                </th>
                <th scope="col" className="px-6 py-4">
                  Customer Name
                </th>

                <th scope="col" className="px-6 py-4">
                  Customer Email
                </th>
                <th scope="col" className="px-6 py-4">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Total Items
                </th>
                <th scope="col" className="px-6 py-4">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-4">
                  Created Order
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const date = new Date(user.createdAt);
                const formatDate = date.toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                });
                return (
                  <tr className="border-b border-neutral-200" key={index}>
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.order.name}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.order.email}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {rupiah(user.order.gross_amount)}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.item_details.length}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {user.order.order_id}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {formatDate}
                    </td>
                    <td className="flex justify-center gap-3 whitespace-nowrap  px-6 py-4">
                      <button
                        className="rounded-md bg-[rgba(0,0,0,0.5)] p-2"
                        onClick={() => setDeleted(user)}
                      >
                        <TrashIcon className="h-6 w-6 text-black" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayouts>
      {Object.keys(deleted).length ? (
        <ModalInput onClose={() => setDeleted({})}>
          <h1 className="mb-6 text-xl font-bold">Delete Product</h1>
          <p className="mb-6 font-semibold">
            Are you sure you want to delete this product?
          </p>
          <button
            className="flex gap-1 rounded-md bg-red-600 px-5 py-3 font-bold text-white"
            type="submit"
            onClick={() => handleDeleteUser(deleted._id)}
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </ModalInput>
      ) : null}
    </React.Fragment>
  );
};

export default TransactionDashboardPage;
