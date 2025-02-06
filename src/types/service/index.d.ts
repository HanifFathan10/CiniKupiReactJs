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
  _id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  user_id: string;
};

type TDataCategory = {
  _id: string;
  name: string;
};

type TDataMenu = {
  _id?: string;
  name?: string;
  image?: Blob | string | null;
  product_id?: TDataSingleProduct[];
  category_id?: TDataCategory;
  nameUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

type TDataSingleProduct = {
  _id?: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  calories?: number;
  sugar?: number;
  fat?: number;
  oz?: number;
  menu_id?: TDataMenu;
};

type TDataDefaultMenu = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

type TQueryParamsHistoryTrx = {
  historyTrxId?: string;
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
  current_page: number;
  total_page: number;
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
  history: TDataOrder;
  token?: string;
}

interface PaymentServiceProps {
  history: TDataOrder;
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
  _id: string;
  username?: string;
  email?: string;
  role?: string;
}

interface GetAllMenuWithData {
  category: string;
}

interface CreateProductMenu {
  name: string;
  price: number;
  image: File | null;
  description: string;
  calories?: number;
  sugar?: number;
  fat?: number;
  oz?: number;
  menu_id: string;
}

interface UpdateProductMenu {
  _id: string;
  calories: number;
  name: string;
  price: number;
  image: File | string | null;
  description: string;
  sugar: number;
  fat: number;
  oz: number;
  menu_id: string;
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
