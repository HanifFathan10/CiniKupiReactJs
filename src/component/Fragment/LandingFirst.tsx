import React, { useState, useTransition } from "react";
import ListImages from "../Elements/ProductItems/ListImages/ListImages";
import TabButton from "../Elements/ProductItems/TabButton/TabButton";

interface LandingFirstProps {
  title: string;
}

const LandingFirst = ({ title }: LandingFirstProps) => {
  const [tab, setTab] = useState("default");
  const [isPending, startTransition] = useTransition();

  const TAB_LIST = [
    {
      title: "default",
      id: "default",
      content: <ListImages type={"default"} />,
    },
    {
      title: "coffe",
      id: "coffe",
      content: <ListImages type={"coffe"} />,
    },
    {
      title: "drink",
      id: "drink",
      content: <ListImages type={"drink"} />,
    },
    {
      title: "dessert",
      id: "dessert",
      content: <ListImages type={"dessert"} />,
    },
  ];

  const HandleTabChange = (id: string) => {
    if (isPending) return;
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#212121]"
      id="menu"
    >
      <div className="mb-24 flex w-full flex-col items-center px-4 pt-16 md:max-w-lg md:pt-20">
        <h1 className="mb-4 text-center text-3xl font-semibold uppercase md:text-4xl">
          {title}
        </h1>
        <div className="mb-5 flex items-center justify-center">
          <TabButton
            selectTab={() => HandleTabChange("coffe")}
            active={tab === "coffe"}
          >
            Coffe
          </TabButton>
          <TabButton
            selectTab={() => HandleTabChange("drink")}
            active={tab === "drink"}
          >
            Drink
          </TabButton>
          <TabButton
            selectTab={() => HandleTabChange("dessert")}
            active={tab === "dessert"}
          >
            Dessert
          </TabButton>
        </div>
        <div className="flex flex-row items-center sm:max-w-md md:w-full">
          {TAB_LIST.find((t) => t.id === tab)?.content}
        </div>
      </div>
    </div>
  );
};

export default LandingFirst;
