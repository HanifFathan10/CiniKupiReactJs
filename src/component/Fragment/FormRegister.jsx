import { useState } from "react";
import Button from "../Elements/Button/Button";
import InputForm from "../Elements/InputForm";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/AuthStore";
import { useCustomToast } from "../../Hooks/useToast";

const FormRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const Navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { SuccessToast, ErrorToast } = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsRegister(true);

      const data = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      };

      await register(data, (status, res) => {
        if (status === true) {
          Navigate("/login");
          SuccessToast({
            id: "register-success",
            title: res.data.message,
          });
        } else {
          ErrorToast({
            id: "register-error",
            title: res.data.message,
          });
        }
      });
    } catch (error) {
      setIsRegister(false);
    } finally {
      setIsRegister(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-72">
      <InputForm
        htmlfor="username"
        placehoder="haniffathan10"
        type="text"
        name="username"
        id="username"
      >
        Username
      </InputForm>

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

      <InputForm
        htmlfor="confirmPassword"
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
        text={isRegister ? "Register..." : "Register"}
        disabled={isRegister}
      />
    </form>
  );
};

export default FormRegister;
