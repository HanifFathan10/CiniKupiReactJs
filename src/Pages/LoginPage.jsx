import { HeadMetaData } from "../component/Elements/HeadMetaData";
import FormLogin from "../component/Fragment/FormLogin";
import AuthUsers from "../component/Layouts/AuthUsers";

const LoginPage = () => {
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
