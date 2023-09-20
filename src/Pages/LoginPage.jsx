import FormLogin from "../component//Fragment/FormLogin"
import AuthUsers from "../component/Layouts/AuthUsers";

const LoginPage = () => {
  return (
    <AuthUsers type="login">
      <FormLogin></FormLogin>
    </AuthUsers> 
  )
};

export default LoginPage;
