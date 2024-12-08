export type TotalItems<T> = {
  count: number;
  items: T;
  isLoading: boolean;
  useCount: () => Promise<void>;
};

export interface IGetNewToken {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: any;
  getNewToken?: () => Promise<void>;
  setIsError?: () => void;
}

export interface IResponseRefreshToken {
  status: boolean;
  message: string;
  access_token: string;
}

export interface useAuthStoreType {
  isLogin: boolean;
  isRegister: boolean;
  isLogout: boolean;

  login: (data: IDataUser, callback: TCallback) => Promise<void>;
  register: (data: IDataUser, callback: TCallback) => Promise<void>;
  logout: (callback: TCallback) => Promise<void>;
}

export interface IGeminiAIChatStore {
  histories: HistoryGeminiAIResponse[];
  setHistories: (newHistories: HistoryGeminiAIResponse) => void;
  getResponseAI: (data: GeminiAIRequest, callback: TCallback) => void;
}
