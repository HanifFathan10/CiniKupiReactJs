import { Iitem } from "../Interface/itemsProduct";

export interface Iorders {
  name: string;
  email: string;
  order_id: string;
  gross_amount: number;
  _id: string;
}

export interface IhistoryOrders {
  _id: string;
  orders: Iorders;
  item_details: Iitem[];
  user_id: string;
}

type TOrder = {
  name: string;
  email: string;
  order_id: string;
  gross_amount: number;
};

export type TDataHistory = {
  orders: TOrder;
  item_details: Iitem[];
};
