import React, { useEffect, useState } from "react";
import useHistoryTrxStore from "../../Store/HistoryTrx";
import { useShallow } from "zustand/react/shallow";

type SortOrderProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const SortOrder = ({ page, setPage }: SortOrderProps) => {
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [getHistoryTrx] = useHistoryTrxStore(
    useShallow((state) => [state.getHistoryTrx]),
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setStatus(e.target.value);
    setPage(1);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setTime(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const data: TQueryParamsHistoryTrx = {
      page,
      limit: 10,
      status,
      time,
    };
    getHistoryTrx(data);
  }, [page, status, time, location]);

  return (
    <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
      <div>
        <label
          htmlFor="order-type"
          className="white sr-only mb-2 block text-sm font-medium"
        >
          Select order type
        </label>
        <select
          id="order-type"
          onChange={handleStatusChange}
          value={status}
          name="order-type"
          className="focus:border-primary-500 focus:ring-primary-500 block w-full min-w-[8rem] rounded-lg  border border-neutral-400 bg-neutral-600 p-2.5 text-sm text-white placeholder:text-gray-400"
        >
          <option value="">All orders</option>
          <option value="settlement">Success</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <span className="inline-block font-medium text-neutral-200"> from </span>

      <div>
        <label
          htmlFor="duration"
          className="sr-only mb-2 block text-sm font-medium text-white"
        >
          Select duration
        </label>
        <select
          id="duration"
          name="duration"
          onChange={handleTimeChange}
          value={time}
          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg  border border-neutral-400 bg-neutral-600 p-2.5 text-sm text-white placeholder:text-gray-400"
        >
          <option value="">All time</option>
          <option value="3days">the last 3 days</option>
          <option value="1week">the last 1 Weeks</option>
          <option value="1months">the last 1 months</option>
          <option value="3months">the last 3 months</option>
        </select>
      </div>
    </div>
  );
};

export default SortOrder;
