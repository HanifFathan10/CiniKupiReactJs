import { Link } from "react-router-dom";

const AuthUsers = ({ children, type }) => {
  return (
    <section className="h-screen text-xs bg-slate-700">
      <div className="gap-6 flex h-full flex-wrap items-center justify-center md:justify-evenly">
        <div className="shrink-0 mb-4 basis-auto md:max-w-xl">
          <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="max-w-xs" alt="Sample image" />
        </div>
        <div className="mb-12 md:max-w-2xl md:justify-center sm:mb-0">
          <div className="max-w-[280px]">
            {children}
            {type == "login" ? (
              <div className="text-center md:text-left">
                <p className="mb-0 mt-6 pt-1 text-xs ">
                  {`Kalo gapunya akun, yaa `}
                  <Link to="/register" className="transition duration-150 font-semibold ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700">
                    Register disini
                  </Link>
                </p>
              </div>
            ) : (
              <div className="text-center md:text-left">
                <p className="mb-0 mt-6 pt-1 text-xs ">
                  {`Kalo udah punya langsung `}
                  <Link to="/login" className="transition duration-150 font-semibold ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700">
                    Login
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthUsers;
