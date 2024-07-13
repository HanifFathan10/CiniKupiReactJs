import { create } from "zustand";
import { Login, Logout, Register } from "../services/AuthService";

const useAuthStore = create((set) => ({
  isLogin: false,
  isRegister: false,
  isLogout: false,

  login: async (data, callback) => {
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

  register: async (data, callback) => {
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

  logout: async (callback) => {
    return await Logout(
      sessionStorage.getItem("access_token"),
      (status, res) => {
        if (status === true) {
          set({ isLogout: true });
          sessionStorage.removeItem("access_token");
          callback(true, res);
        } else {
          set({ isLogout: false });
          callback(false, res);
        }
      },
    );
  },
}));

export default useAuthStore;
