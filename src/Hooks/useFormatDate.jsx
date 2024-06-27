import React, { useEffect, useState } from "react";

const useFormatDate = (date, formatOptions = {}) => {
  const [formattedDate, setFormattedDate] = useState("");

  const formatDate = (date, formatOptions) => {
    const options = {
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
