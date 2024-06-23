import { useState } from "react";

const useSlug = () => {
  const [inputText, setInputText] = useState("");
  const [slug, setSlug] = useState("");

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleInputChange = (e) => {
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
