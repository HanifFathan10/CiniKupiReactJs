import Label from "./Label";
import Input from "./Input";
import React from "react";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  htmlForLabel: React.LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
}

const InputForm = ({
  children,
  className,
  htmlForLabel,
  ...props
}: InputFormProps) => {
  return (
    <div className={`group relative z-0 mb-5 w-full ${className}`}>
      <Input {...props} />
      <Label htmlFor={htmlForLabel}>{children}</Label>
    </div>
  );
};

export default InputForm;
