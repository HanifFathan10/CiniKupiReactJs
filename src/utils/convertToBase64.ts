import React from "react";

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<File | null>>,
) => {
  const file = event.target.files?.[0];
  const maxSize = 3 * 1024 * 1024; // 3MB

  if (!file) return;
  if (file.size > maxSize) return;

  setImages(file);
};
