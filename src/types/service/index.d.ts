// TYPES
type TCallback = (success: boolean, data: any) => void;
type IDataPromptAI = {
  prompt?: string;
  image?: string;
  mimeType?: string;
};

type IDataUser = {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  refresh_token?: string;
  token?: string;
};

type TDataOrder = {
  _id?: string;
  id?: string;
  image?: string;
  name?: string;
  price?: number;
  quantity?: number;
  user_id?: string;
};

type TDataMenu = {
  _id?: string;
  name?: string;
  image?: string;
  products?: TDataSingleProduct[];
  category?: string;
  nameurl?: string;
  createdAt?: string;
  updatedAt?: string;
};

type TDataSingleProduct = {
  _id?: string;
  id_menu?: string;
  name?: string;
  price?: number;
  image?: string;
  descriptions?: string;
  calories?: number;
  sugar?: number;
  fat?: number;
  oz?: number;
};

type TDataSingleProductPopulatedMenu = {
  _id?: string;
  id_menu?: TDataMenu;
  name?: string;
  price?: number;
  image?: string;
  descriptions?: string;
  calories?: number;
  sugar?: number;
  fat?: number;
  oz?: number;
};

type MenuFormData = {
  name: string;
  nameurl: string;
  category: string;
  image: string;
};

type TDataProductWithMenu = {
  _id: string;
  id_menu: TDataMenu;
  name: string;
  price: number;
  image: string;
  descriptions: string;
  calories: number;
  sugar: number;
  fat: number;
  oz: number;
};

type TDataDefaultMenu = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

type TGetTokenForPayment = {
  products?: TDataSingleProduct[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
};

type TQueryParamsHistoryTrx = {
  page?: number;
  limit?: number;
  search?: string;
  sortKey?: string;
  sortDirection?: string;
  startDate?: string | null;
  endDate?: string | null;
  status?: string;
  time?: string;
};

type TDataOrderDetails = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  order_id?: sring;
  gross_amount?: number;
};

type TDataItemDetails = {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
};

type TDataHistoryTrx = {
  _id?: string;
  order?: TDataOrderDetails;
  item_details?: TDataItemDetails[];
  user_id?: IDataUser;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

type TDataHistoryPending = TDataHistoryTrx & {
  token: string;
};

type Pagination = {
  currentPage?: number;
  totalPages?: number;
};

type DataResponseMonthlySales = {
  month?: string;
  total?: number;
};

type DataResponseStatusDistribution = {
  count?: number;
  status?: string;
};

type DataResponseTopSellingProducts = {
  product?: string;
  quantity?: number;
};

// INTERFACE

interface PrevDataPayment {
  history?: TDataOrder;
  token?: string;
}

interface PaymentServiceProps {
  history?: TDataOrder;
  token?: string;
  accessToken?: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResponsePayment {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers: [{ bank: string; va_number: string }];
  bca_va_number: string;
  pdf_url: string;
  finish_redirect_url: string;
}

interface DataUpdateUser {
  username?: string;
  email?: string;
  role?: string;
}

interface GetAllMenuWithData {
  category: string;
}

interface CreateProductMenu {
  id_menu: string;
  calories: number;
  name: string;
  price: number;
  image: string;
  descriptions: string;
  sugar: number;
  fat: number;
  oz: number;
}

interface UpdateProductMenu {
  _id: string;
  id_menu?: string;
  calories?: number;
  name?: string;
  price?: number;
  image?: string;
  descriptions?: string;
  sugar?: number;
  fat?: number;
  oz?: number;
}

interface DeleteProductMenu {
  _id: string;
  id_menu: string;
}

interface OrderDetailsTransaction {
  _id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  order_id: string;
  gross_amount: number;
}

interface ItemDetailsTransaction {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AllDataTransaction {
  _id?: string;
  order?: OrderDetailsTransaction;
  item_details?: ItemDetailsTransaction[];
  user_id?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
