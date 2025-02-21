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

type CustomerDetailResponse = {
  first_name: string;
  email: string;
  phone: number;
  shipping_address: {
    address: string;
    country_id: string;
  };
};

type ItemDetailsResponse = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type TDataOrder = {
  _id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  user_id: string;
  product_id: string;
};

type THistoryResponseOrder = {
  customer_details: CustomerDetailResponse;
  item_details: ItemDetailsResponse[];
  transaction_details: {
    gross_amount: number;
    order_id: string;
  };
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
  user_id?: string;
  page: number;
  limit: number;
  search?: string;
  sortKey?: string;
  sortDirection?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  time: string;
};

type TDataHistoryPending = TDataHistoryTrx & {
  token: string;
};

type Pagination = {
  current_page: number;
  total_pages: number;
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

interface PaymentServiceProps {
  history: THistoryResponseOrder;
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

interface CustomerDetails {
  _id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  gross_amount: number;
}

interface ItemDetails {
  _id: string;
  product_id: TDataSingleProduct;
  quantity: number;
}

interface AllDataTransaction {
  _id: string;
  customer_detail: CustomerDetails;
  item_details: ItemDetails[];
  user_id: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
