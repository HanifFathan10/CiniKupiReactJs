import { IitemsProduct } from "../Interface/itemsProduct";

export type TCart = {
  product: IitemsProduct;
  data: IitemsProduct;
  removeById: string | undefined;
};
