import { HeadMetaData } from "../component/Elements/HeadMetaData";
import AuthUsers from "../component/Layouts/AuthUsers";
import FormLogin from "../component/Fragment/FormLogin";

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
