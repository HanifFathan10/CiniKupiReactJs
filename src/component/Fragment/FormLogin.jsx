import InputForm from "../Elements/InputForm";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../../services/AuthService";
import { addToCart } from "../../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";

const FormLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();
  const login = addToCart(useShallow((state) => state.login));

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      Login(data, (status, res) => {
        if (status) {
          localStorage.setItem("accessToken", res.data.accessToken);
          Navigate("/");
          login(res.data.data.username);
        } else {
          setMsg(res.response.data.message);
          setTimeout(() => {
            setMsg("");
          }, 3000);
        }
      });

      if (!localStorage.getItem("accessToken")) {
        Navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const auth = () => {
    window.location.href = "https://cini-kupi-api.vercel.app/auth/google";

    if (!localStorage.getItem("accessToken")) {
      Navigate("/login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex w-full flex-col">
      {msg && (
        <h1 className="mb-2 text-center font-semibold text-red-400">{msg}</h1>
      )}
      <InputForm
        htmlfor="email"
        onChange={(e) => setEmail(e.target.value)}
        placehoder="haniffathan@example.com"
        type="email"
        name="email"
        id="email"
      >
        Email Address
      </InputForm>

      <InputForm
        htmlfor="password"
        onChange={(e) => setPassword(e.target.value)}
        placehoder="********"
        type="password"
        name="password"
        id="password"
      >
        Password
      </InputForm>

      <Button
        type="submit"
        background="bg-slate-700 inline-block rounded px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-white hover:bg-slate-900 transition duration-300 hover:scale-105"
        text="Login"
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
        <img
          fetchpriority="high"
          src="images/google.webp"
          alt="icon"
          width={20}
          height={20}
        />
        <h1>Google</h1>
      </button>
    </form>
  );
};

export default FormLogin;
