import * as React from "react";
import Label from "./Label";
import Input from "./Input";
import { IinputForm } from "../../../Interface/component";

const InputForm = ({
  children,
  htmlfor,
  placeholder,
  type,
  name,
  id,
  ref,
  onChange,
  value,
  className,
}: IinputForm) => {
  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      <Label htmlfor={htmlfor}>{children}</Label>
      <Input
        placeholder={placeholder}
        id={id}
        type={type}
        name={name}
        ref={ref}
        onChange={onChange}
        value={value}
      ></Input>
    </div>
  );
};

export default InputForm;
