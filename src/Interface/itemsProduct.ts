export interface IitemsProduct extends IdetailProduct {
  _id?: string;
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  quantity?: number;
  user_id?: IuserId;
}

export type TProdak = {
  name: string;
  price: number;
  image: string;
  alt: string;
  _id: string;
};

export interface Iitem {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IdetailProduct {
  descriptions?: string;
  fat?: number;
  calories?: number;
  sugar?: number;
}

export interface IuserId {
  _id: string;
}

export interface Imenu {
  _id: string;
  name: string;
  image: string;
  price: number;
  product: IitemsProduct[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  category: string;
  nameurl: string;
}

export type TPromo = {
  image: string;
  title: string;
  description: string;
  alt: string;
  button: string;
  to: string;
  background: string;
};
