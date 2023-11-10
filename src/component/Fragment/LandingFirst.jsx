import { useState, useTransition } from "react";
import ListImages from "../Elements/ProductItems/ListImages/ListImages";
import TabButton from "../Elements/ProductItems/TabButton/TabButton";


const LandingFirst = ({ title }) => {
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

  const HandleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  
  return (
    <div className="flex bg-[#212121] min-h-screen justify-center items-center shadow-lg" id="menu">
      <div className="w-full pt-16 md:pt-20 px-4 max-w-sm md:max-w-lg mb-24">
        <h1 className="text-center text-3xl md:text-4xl uppercase font-semibold mb-4">{title}</h1>
        <div className="flex justify-center items-center mb-5">
          <TabButton selectTab={() => HandleTabChange("coffe")} active={tab === "coffe"}>
            Coffe
          </TabButton>
          <TabButton selectTab={() => HandleTabChange("drink")} active={tab === "drink"}>
            Drink
          </TabButton>
          <TabButton selectTab={() => HandleTabChange("dessert")} active={tab === "dessert"}>
            Dessert
          </TabButton>
        </div>
        <div className="flex flex-row">{TAB_LIST.find((t) => t.id === tab)?.content}</div>
      </div>
    </div>
  );
};

export default LandingFirst;
