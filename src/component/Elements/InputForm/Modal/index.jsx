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
    <div className="fixed top-0 z-[9999] flex h-screen w-[100vw] items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="w-[80%] rounded-xl bg-white px-8 py-6" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default ModalInput;
