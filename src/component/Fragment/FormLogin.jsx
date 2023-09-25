import InputForm from "../Elements/InputForm";
import CheckBox from "../Elements/InputForm/CheckBox";
import Button from "../Elements/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Login } from "../../services/Auth.service";

const FormLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState('')
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    Login(data, (status, res)=> {
      if (status) {
        localStorage.setItem("accesToken", res)
        Navigate('/')
      } else {
        setMsg(res.response.data.message)
      }
    })
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm htmlfor="email" onChange={(e) => setEmail(e.target.value)} placehoder="haniffathan@example.com" type="email" name="email" id="email">
        Email Address
      </InputForm>

      <InputForm htmlfor="password" onChange={(e) => setPassword(e.target.value)} placehoder="********" type="password" name="password" id="password">
        Password
      </InputForm>
      {msg && <h1 className="mb-2 text-center text-red-400 font-semibold">{msg}</h1>}
      <CheckBox />

      <Button type="submit" background="bg-slate-400 inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" text="Login" />
    </form>
  );
};

export default FormLogin;
