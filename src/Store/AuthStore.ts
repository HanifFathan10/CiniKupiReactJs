import { create } from "zustand";
import {
  Login,
  Logout,
  RefreshToken,
  Register,
} from "../services/auth.service";

interface useAuthStoreType {
  isLogin: boolean;
  isRegister: boolean;
  isLogout: boolean;
  isRefreshToken: boolean;

  login: (data: IDataUser, callback: TCallback) => Promise<void>;
  register: (data: IDataUser, callback: TCallback) => Promise<void>;
  logout: (callback: TCallback) => Promise<void>;
  refreshToken: (callback: TCallback) => Promise<void>;
}

const useAuthStore = create<useAuthStoreType>((set) => ({
  isLogin: false,
  isRegister: false,
  isLogout: false,
  isRefreshToken: false,

  login: async (data: IDataUser, callback: TCallback) => {
    return await Login(data, (status, res) => {
      if (status === true) {
        set({ isLogin: true });
        sessionStorage.setItem("access_token", res.data.accessToken);
        callback(true, res);
      } else {
        set({ isLogin: false });
        callback(false, res);
      }
    });
  },

  register: async (data: IDataUser, callback: TCallback) => {
    return await Register(data, (status, res) => {
      if (status === true) {
        set({ isRegister: true });
        callback(true, res);
      } else {
        set({ isRegister: false });
        callback(false, res);
      }
    });
  },

  logout: async (callback: TCallback) => {
    return await Logout((status, res) => {
      if (status === true) {
        set({ isLogout: true });
        sessionStorage.removeItem("access_token");
        callback(true, res);
      } else {
        if (res.response.status === 403) {
          // set({ isLogout: false, isRefreshToken: true });
          callback(false, res);
        }
      }
    });
  },

  refreshToken: async (callback: TCallback) => {
    return await RefreshToken((status, res) => {
      if (status === true) {
        sessionStorage.setItem("access_token", res.access_token);
        window.location.reload();

        set({ isRefreshToken: false });
        callback(status, res);
      } else {
        set({ isRefreshToken: false });
        callback(status, res);
      }
    });
  },
}));

export default useAuthStore;
