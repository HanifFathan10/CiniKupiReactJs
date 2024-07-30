import { useEffect } from "react";
import { HeadMetaData } from "../component/Elements/HeadMetaData";
import FormLogin from "../component/Fragment/FormLogin";
import AuthUsers from "../component/Layouts/AuthUsers";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("access_token"))
      Navigate("/", {
        preventScrollReset: true,
        unstable_viewTransition: true,
      });
  }, []);
  return (
    <>
      <HeadMetaData title="Login" metaDescription="Login page by CiniKupi" />
      <AuthUsers type="login">
        <FormLogin />
      </AuthUsers>
    </>
  );
};

export default LoginPage;
