import React from "react";

export const convertToBase64 = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<string>>,
) => {
  const file = event.target.files![0];
  const reader = new FileReader();
  const maxSize = 3 * 1024 * 1024; // 3MB

  if (file.size > maxSize) {
    return;
  }

  reader.onload = () => {
    const base64String = reader.result;
    setImages(base64String as string);
  };

  reader.onerror = (error) => {
    return;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};
