import { IitemsProduct } from "./itemsProduct";

export interface ItotalItems {
  count: number;
  items: IitemsProduct[];
  isLoading: boolean;
  useCount: () => void;
}
