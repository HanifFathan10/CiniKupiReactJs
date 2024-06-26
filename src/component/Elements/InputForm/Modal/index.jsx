import React, { useEffect, useRef } from "react";

const ModalInput = ({ onClose, children }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed top-0 z-[9999] flex h-screen min-h-screen w-[100vw] items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.5)]">
      <div
        className="h-fit max-h-[80%] w-full max-w-4xl overflow-auto rounded-md px-2"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalInput;
