import React, { useState } from "react";
import InputForm from "../Elements/InputForm";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/AuthStore";
import { useCustomToast } from "../../Hooks/useToast";

const FormRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const Navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { SuccessToast, ErrorToast } = useCustomToast();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsRegister(true);

      const data = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirm_password: e.target.confirm_password.value,
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
        htmlForLabel="username"
        type="text"
        name="username"
        id="username"
        placeholder=" "
        required
      >
        Username
      </InputForm>

      <InputForm
        htmlForLabel="email"
        type="email"
        name="email"
        id="email"
        placeholder=" "
        required
      >
        Email Address
      </InputForm>

      <InputForm
        htmlForLabel="password"
        type="password"
        name="password"
        id="password"
        placeholder=" "
        required
      >
        Password
      </InputForm>

      <InputForm
        htmlForLabel="confirm_password"
        type="password"
        name="confirm_password"
        id="confirm_password"
        placeholder=" "
        required
      >
        Confirm Password
      </InputForm>

      <button
        type="submit"
        className={`mb-2 me-2 w-full rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 ${isRegister ? "cursor-not-allowed bg-neutral-500 opacity-50" : ""}`}
        disabled={isRegister}
      >
        {isRegister ? "Register..." : "Register"}
      </button>
    </form>
  );
};

export default FormRegister;
