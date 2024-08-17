import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCustomToast } from "../../Hooks/useToast";
import { z } from "zod";
import InputForm from "../Elements/InputForm";
import useAuthStore from "../../Store/AuthStore";

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").max(100, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const FormLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const Navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { SuccessToast, ErrorToast } = useCustomToast();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLogin(true);

      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      await login(data, (status, res) => {
        if (status === true) {
          res.data.role === "admin"
            ? Navigate("/admin", { replace: true })
            : Navigate("/", { replace: true });
          SuccessToast({
            id: "login-success",
            title: res.message,
          });
        } else {
          ErrorToast({
            id: "login-error",
            title: res.message,
          });
        }
      });
    } catch (error) {
      setIsLogin(false);
    } finally {
      setIsLogin(false);
    }
  };

  const auth = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <form onSubmit={handleLogin} className="flex w-full flex-col md:w-72">
      <InputForm
        htmlForLabel="email"
        type="email"
        name="email"
        id="email"
        placeholder=" "
        required
      >
        Email Address
      </InputForm>

      <InputForm
        htmlForLabel="password"
        type="password"
        name="password"
        id="password"
        placeholder=" "
        required
      >
        Password
      </InputForm>

      <button
        type="submit"
        className={`mb-2 me-2 rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 ${isLogin ? "cursor-not-allowed bg-neutral-500 opacity-50" : ""}`}
        disabled={isLogin}
      >
        {isLogin ? "Login..." : "Login"}
      </button>

      <div className="flex items-center gap-3">
        <hr className="h-[2px] w-full bg-slate-600" />
        <h2 className="w-full py-2 text-center text-sm">Or Login With</h2>
        <hr className="items-strech h-[2px] w-full bg-slate-600" />
      </div>

      <button
        onClick={auth}
        type="button"
        className="item-center flex justify-center gap-2 rounded bg-[#eaeaea] px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-[#212121] transition duration-300 hover:bg-slate-800 hover:text-[#ffffff]"
      >
        <img
          src="images/google.webp"
          alt="icon"
          width={20}
          height={20}
          loading="lazy"
        />
        <h3>Google</h3>
      </button>
    </form>
  );
};

export default FormLogin;
