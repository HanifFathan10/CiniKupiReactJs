import React, { useState } from "react";

const useSearchTrim = () => {
  const [trimSearch, setTrimSearch] = useState("");

  const trimmedValue = trimSearch.trim();
  const handleSubmitChange = (e) => {
    e.preventDefault();

    if (!trimmedValue) return;
  };

  return {
    trimSearch,
    setTrimSearch,
    trimmedValue,
    handleSubmitChange,
  };
};

export default useSearchTrim;
