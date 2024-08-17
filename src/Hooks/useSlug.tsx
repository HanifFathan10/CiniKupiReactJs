import React, { useState } from "react";

const useSlug = () => {
  const [inputText, setInputText] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    setSlug(createSlug(text));
  };

  return {
    inputText,
    slug,
    handleInputChange,
  };
};

export default useSlug;
