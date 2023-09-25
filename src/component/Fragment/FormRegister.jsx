import { useState } from "react";
import Button from "../Elements/Button/Button";
import InputForm from "../Elements/InputForm";
import {useNavigate } from "react-router-dom"; 
import { Register } from "../../services/Auth.service";

const FormRegister = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const Navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    Register(data, (status, res)=> {
      if (status) {
        window.location.href = "/login"
      } else {
        setMsg(res.response.data.message)
      }
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-lg">{msg}</p>
      <InputForm htmlfor="username" value={username} onChange={(e) => setUsername(e.target.value)} placehoder="haniffathan10" type="text" name="username" id="username">
        Username
      </InputForm>

      <InputForm htmlfor="email" value={email} onChange={(e) => setEmail(e.target.value)} placehoder="haniffathan@example.com" type="email" name="email" id="email">
        Email Address
      </InputForm>

      <InputForm htmlfor="password" value={password} onChange={(e) => setPassword(e.target.value)} placehoder="********" type="password" name="password" id="password">
        Password
      </InputForm>

      <InputForm htmlfor="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placehoder="********" type="password" name="confirmPassword" id="password">
        Confirm Password
      </InputForm>

      <Button type="submit" background="bg-slate-400 inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" text="Sign Up" />
    </form>
  );
};

export default FormRegister;
