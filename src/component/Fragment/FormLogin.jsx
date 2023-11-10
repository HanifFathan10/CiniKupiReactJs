import InputForm from "../Elements/InputForm";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../../services/AuthService";

const FormLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    Login(data, (status, res) => {
      if (status) {
        localStorage.setItem("accessToken", res);
        Navigate("/");
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
  };

  const auth = () => {
    window.location.href = "http://localhost:5000/auth/google"

    if (!localStorage.getItem("accessToken")) {
      Navigate("/login");
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      {msg && <h1 className="mb-2 text-center text-red-400 font-semibold">{msg}</h1>}
      <InputForm htmlfor="email" onChange={(e) => setEmail(e.target.value)} placehoder="haniffathan@example.com" type="email" name="email" id="email">
        Email Address
      </InputForm>

      <InputForm htmlfor="password" onChange={(e) => setPassword(e.target.value)} placehoder="********" type="password" name="password" id="password">
        Password
      </InputForm>

      <Button type="submit" background="bg-slate-700 inline-block rounded px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-white hover:bg-slate-500" text="Login" />

      <div className="flex flex-col items-center">
        <h2 className="py-2">Or Login With</h2>
      </div>
      <button onClick={() => auth()} type="button" className="flex justify-center item-center bg-[#eaeaea] rounded px-7 pb-2.5 pt-3 text-sm font-semibold uppercase gap-2 text-[#212121] hover:text-[#ffffff] hover:bg-slate-800 transition-all">
        <img src="images/google.png" alt="google" width={20} height={20} />
        <h1>Google</h1>
      </button>
    </form>
  );
};

export default FormLogin;
