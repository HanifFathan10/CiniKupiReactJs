import InputForm from "../Elements/InputForm";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCustomToast } from "../../Hooks/useToast";
import useAuthStore from "../../Store/AuthStore";

const FormLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { SuccessToast, ErrorToast } = useCustomToast();
  const Navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLogin(true);

      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      await login(data, (status, res) => {
        if (status === true) {
          res.data.data.role === "admin" ? Navigate("/admin") : Navigate("/");
          SuccessToast({
            id: "login-success",
            title: res.data.message,
          });
        } else {
          ErrorToast({
            id: "login-error",
            title: res.response.data.message,
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
        htmlfor="email"
        placehoder="haniffathan@example.com"
        type="email"
        name="email"
        id="email"
      >
        Email Address
      </InputForm>

      <InputForm
        htmlfor="password"
        placehoder="********"
        type="password"
        name="password"
        id="password"
      >
        Password
      </InputForm>

      <Button
        type="submit"
        background={`bg-slate-700 inline-block rounded px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-white hover:bg-slate-900 transition duration-300 hover:scale-105 ${isLogin ? "cursor-not-allowed opacity-50 bg-neutral-500" : ""}`}
        text={isLogin ? "Login..." : "Login"}
        disabled={isLogin}
      />

      <div className="flex items-center gap-3">
        <hr className="h-[2px] w-full bg-slate-600" />
        <h2 className="w-full py-2 text-center text-sm">Or Login With</h2>
        <hr className="items-strech h-[2px] w-full bg-slate-600" />
      </div>

      <button
        onClick={auth}
        type="button"
        className="item-center flex justify-center gap-2 rounded bg-[#eaeaea] px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-[#212121] transition duration-300 hover:scale-105 hover:bg-slate-800 hover:text-[#ffffff]"
      >
        <img src="images/google.webp" alt="icon" width={20} height={20} />
        <h3>Google</h3>
      </button>
    </form>
  );
};

export default FormLogin;
