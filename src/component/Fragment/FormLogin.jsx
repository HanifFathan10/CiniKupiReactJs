import InputForm from "../Elements/InputForm";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../../services/AuthService";
import { useToast } from "@chakra-ui/react";
import { useCustomToast } from "../../Hooks/useToast";

const FormLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { SuccessToast, ErrorToast } = useCustomToast();
  const Navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLogin(true);

      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      await Login(data, (status, res) => {
        if (status === true) {
          sessionStorage.setItem("access_token", res.data.accessToken);

          SuccessToast({
            id: "login",
            title: res.data.message,
          });
          res.data.data.role === "admin" ? Navigate("/admin") : Navigate("/");

          setIsLogin(false);
        } else {
          ErrorToast({
            id: "login",
            title: res.response.data.message,
          });

          setIsLogin(false);
        }
      });

      if (!sessionStorage.getItem("access_token")) {
        Navigate("/login");
      }
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
        <h1>Google</h1>
      </button>
    </form>
  );
};

export default FormLogin;
