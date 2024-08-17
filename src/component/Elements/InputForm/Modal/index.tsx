import React, { useEffect, useRef } from "react";

interface ModalInput {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalInput = ({ onClose, children }: ModalInput) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
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
