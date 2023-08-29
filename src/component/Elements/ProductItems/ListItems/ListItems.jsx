import React from "react";

const ListItems = ({classnameUl, classnameLi}) => {
  const Lists = [{ name: "coffe" }, { name: "drink" }, { name: "dessert" }];
  return (
      <ul className={classnameUl}>
        {Lists.map((list) => (
          <li key={list.name} className={classnameLi}>
            {list.name}
          </li>
        ))}
      </ul>
  );
};

export default ListItems;
