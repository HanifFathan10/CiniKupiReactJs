import React, { useState } from "react";

const useSearchTrim = () => {
  const [trimSearch, setTrimSearch] = useState<string>("");

  const trimmedValue = trimSearch.trim();
  const handleSubmitChange = (e: React.ChangeEvent<HTMLFormElement>) => {
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
