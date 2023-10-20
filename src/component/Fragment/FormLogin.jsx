import InputForm from "../Elements/InputForm";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../../services/Auth.service";

const FormLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("accesToken")) {
      Navigate("/login");
    }

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    Login(data, (status, res) => {
      if (status) {
        localStorage.setItem("accesToken", res);
        Navigate("/");
      } else {
        setMsg(res.response.data.message);
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
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
      {msg && (
        <h1 className="mb-2 text-center text-red-400 font-semibold">{msg}</h1>
      )}

      <Button
        type="submit"
        background="bg-slate-700 inline-block rounded px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-white hover:bg-slate-500"
        text="Login"
      />
    </form>
  );
};

export default FormLogin;
