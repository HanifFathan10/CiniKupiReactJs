import * as React from "react";
import { Ibutton } from "../../../Interface/component";

const Button = ({
  background = "bg-slate-500",
  text,
  onClick,
  disabled,
  type = "button",
}: Ibutton) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${background} rounded-md px-2 py-2 text-xs sm:text-sm`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
