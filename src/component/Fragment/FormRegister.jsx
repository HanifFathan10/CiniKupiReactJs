import { useState } from "react";
import Button from "../Elements/Button/Button";
import InputForm from "../Elements/InputForm";
import { useNavigate } from "react-router-dom";
import { Register } from "../../services/Auth.service";

const FormRegister = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const Navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    Register(data, (status, res) => {
      if (status) {
        Navigate("/login");
      } else {
        setMsg(res.response.data.message);
      }
    });
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

      <InputForm htmlfor="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placehoder="********" type="password" name="confirmPassword" id="confirmPassword">
        Confirm Password
      </InputForm>

      <Button type="submit" background="bg-slate-400 inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white" text="Sign Up" />
    </form>
  );
};

export default FormRegister;
