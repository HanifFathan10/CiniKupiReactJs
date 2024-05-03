import { IitemsProduct } from "../Interface/itemsProduct";

export type TDataCustomer = {
  customer_name: string;
  customer_email: string | null;
  products: IitemsProduct[];
};
