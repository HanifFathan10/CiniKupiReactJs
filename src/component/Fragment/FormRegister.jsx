import { useState } from "react";
import Button from "../Elements/Button/Button";
import InputForm from "../Elements/InputForm";
import { useNavigate } from "react-router-dom";
import { Register } from "../../services/AuthService";

const FormRegister = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const Navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    Register(data, (status, res) => {
      if (status) {
        setSuccess(res.data.message);
        setTimeout(() => {
          setSuccess("");
          Navigate("/login");
        }, 2000);
      } else {
        setMsg(res.response.data.message);
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {msg && (
        <p className="mb-2 text-center font-semibold text-red-400">{msg}</p>
      )}
      {success && (
        <p className="text-green-500 mb-2 text-center font-semibold">
          {success}
        </p>
      )}
      <InputForm
        htmlfor="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placehoder="haniffathan10"
        type="text"
        name="username"
        id="username"
      >
        Username
      </InputForm>

      <InputForm
        htmlfor="email"
        value={email}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placehoder="********"
        type="password"
        name="password"
        id="password"
      >
        Password
      </InputForm>

      <InputForm
        htmlfor="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placehoder="********"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
      >
        Confirm Password
      </InputForm>

      <Button
        type="submit"
        background="w-full bg-slate-700 inline-block rounded px-7 pb-2.5 pt-3 text-sm font-semibold uppercase text-white hover:bg-slate-900 transition duration-300 hover:scale-105"
        text="Register"
      />
    </form>
  );
};

export default FormRegister;
