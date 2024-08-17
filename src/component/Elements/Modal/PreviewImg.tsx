import React from "react";
import ModalInput from "../InputForm/Modal";

const PreviewImg = ({ previewData, setPreviewData }) => {
  return Object.keys(previewData).length ? (
    <ModalInput onClose={() => setPreviewData({})}>
      <div class="relative mx-auto flex w-full items-center justify-center rounded-md bg-white p-4 shadow sm:p-5">
        <img
          src={previewData.image}
          alt="gambar"
          className="h-full w-full max-w-xl bg-center bg-no-repeat object-cover"
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
    </ModalInput>
  ) : null;
};

export default PreviewImg;
