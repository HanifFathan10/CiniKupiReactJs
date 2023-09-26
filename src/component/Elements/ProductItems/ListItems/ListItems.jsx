import React from "react";
import { Link } from "react-router-dom";

const ListItems = ({ classnameUl, classnameLi }) => {
  const Lists = [
    { name: "coffe", to: "/coffe" },
    { name: "drink", to: "/drink" },
    { name: "dessert", to: "/dessert" },
  ];
  return (
    <ul className={classnameUl}>
      {Lists.map((list) => (
        <li key={list.name} className={classnameLi}>
          <Link to={list.to}>{list.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
