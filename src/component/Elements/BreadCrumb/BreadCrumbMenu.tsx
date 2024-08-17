import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { kebabToTitleCase } from "../../../utils/kebabToTitleCase";

interface BreadCrumbMenuProps {
  hrefMenu: string;
  linkMenu: string;
  LinkProduct?: string;
  nameUrl?: string;
}

const BreadCrumbMenu = ({
  hrefMenu,
  linkMenu,
  LinkProduct,
  nameUrl,
}: BreadCrumbMenuProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 md:pb-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={hrefMenu}
            className="inline-flex items-center text-sm font-medium uppercase text-gray-700 hover:text-blue-600"
          >
            <HomeIcon className="me-2.5 h-3 w-3" />
            {linkMenu}
          </Link>
        </li>
        {LinkProduct && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Link
                to={`/menu/${LinkProduct}`}
                className="ml-1 text-sm font-medium uppercase text-gray-700 hover:text-blue-600"
              >
                {kebabToTitleCase(nameUrl!)}
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default BreadCrumbMenu;
