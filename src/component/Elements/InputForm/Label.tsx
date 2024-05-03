import * as React from "react";

const Label = ({
  htmlfor,
  children,
}: {
  htmlfor: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={htmlfor} className="mb-2 font-semibold">
      {children}
    </label>
  );
};

export default Label;
