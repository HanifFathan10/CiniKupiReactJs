import { create } from "zustand";
import { Login, Logout, Register } from "../services/AuthService";

interface useAuthStoreType {
  isLogin: boolean;
  isRegister: boolean;
  isLogout: boolean;

  login: (data: IDataUser, callback: TCallback) => Promise<void>;
  register: (data: IDataUser, callback: TCallback) => Promise<void>;
  logout: (callback: TCallback) => Promise<void>;
}

const useAuthStore = create<useAuthStoreType>((set) => ({
  isLogin: false,
  isRegister: false,
  isLogout: false,

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
    const data = {
      token: sessionStorage.getItem("access_token") as string,
    };

    return await Logout(data, (status, res) => {
      if (status === true) {
        set({ isLogout: true });
        sessionStorage.removeItem("access_token");
        callback(true, res);
      } else {
        set({ isLogout: false });
        callback(false, res);
      }
    });
  },
}));

export default useAuthStore;
