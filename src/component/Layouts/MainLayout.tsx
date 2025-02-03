import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  const { children } = props;

  return <main className="mx-auto w-full max-w-[1536px]">{children}</main>;
};

export default MainLayout;
