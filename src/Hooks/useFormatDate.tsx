import React, { useEffect, useState } from "react";

const useFormatDate = (date: string, formatOptions = {}) => {
  const [formattedDate, setFormattedDate] = useState("");

  const formatDate = (
    date: string,
    formatOptions?: Intl.DateTimeFormatOptions,
  ) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...formatOptions,
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };

  useEffect(() => {
    if (date) {
      setFormattedDate(formatDate(date, formatOptions));
    }
  }, [date, formatOptions]);

  return formattedDate;
};

export default useFormatDate;
