import FormRegister from "../component/Fragment/FormRegister"
import AuthUsers from "../component/Layouts/AuthUsers";

const RegisterPage = () => {
  return (
    <AuthUsers type="register">
      <FormRegister></FormRegister>
    </AuthUsers>
  )
};

export default RegisterPage;
