import FormRegister from "../component/Fragment/FormRegister";
import AuthUsers from "../component/Layouts/AuthUsers";
import { HeadMetaData } from "../component/Elements/HeadMetaData";

const RegisterPage = () => {
  return (
    <>
      <HeadMetaData
        title="Register"
        metaDescription="Register Page by CiniKupi"
      />
      <AuthUsers type="register">
        <FormRegister></FormRegister>
      </AuthUsers>
    </>
  );
};

export default RegisterPage;
