import { useState } from "react";
import Button from "../Elements/Button/Button";
import InputForm from "../Elements/InputForm";
import { useNavigate } from "react-router-dom";
import { Register } from "../../services/AuthService";
import { useToast } from "@chakra-ui/react";

const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const Navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRegister(true);

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    Register(data, (status, res) => {
      try {
        if (status === true) {
          const successMsg = res.data.message; // Pesan sukses dari server
          setIsRegister(false);
          setTimeout(() => {
            Navigate("/login");
          }, 1500);

          if (!toast.isActive("register")) {
            // Memeriksa apakah toast sudah aktif
            toast({
              id: "register",
              title: successMsg,
              containerStyle: {
                marginTop: "80px",
                fontSize: "12px",
              },
              status: "success",
              position: "top",
              variant: "top-accent",
              isClosable: true,
            });
          }
        } else {
          const errorMsg = res.response.data.message; // Pesan error dari server
          setIsRegister(false);

          if (!toast.isActive("error_id")) {
            // Memeriksa apakah toast sudah aktif
            toast({
              id: "error_id",
              title: errorMsg,
              containerStyle: {
                marginTop: "80px",
                fontSize: "12px",
              },
              status: "error",
              position: "top",
              variant: "left-accent",
              isClosable: true,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        text={isRegister ? "Register..." : "Register"}
        disabled={isRegister}
      />
    </form>
  );
};

export default FormRegister;
