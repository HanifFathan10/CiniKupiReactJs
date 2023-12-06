import { Link } from "react-router-dom";

const AuthUsers = ({ children, type }) => {
  return (
    <section className="h-screen flex justify-center text-xs bg-[#ffffff]">
      <div className="gap-3 flex h-full max-md:flex-col items-center justify-center md:justify-evenly">
        <div className="shrink-0 mb-4 basis-auto md:max-w-xl">
          {type == "login" ? (
            <img
              src="images/login.webp"
              width={220}
              height={220}
              className="md:w-96"
              alt="Sample image"
              fetchpriority="high"
            />
          ) : (
            <img
              src="images/register.webp"
              width={220}
              height={220}
              className="md:w-96"
              alt="Sample image"
              fetchpriority="high"
            />
          )}
        </div>
        <div className="mb-12 md:max-w-4xl md:justify-center sm:mb-0">
          <div className="max-w-[280px] md:max-w-sm">
            {children}
            {type == "login" ? (
              <div className="text-center md:text-left">
                <p className="mb-0 mt-6 pt-1 text-xs ">
                  {`Don't have an account? `}
                  <Link
                    to="/register"
                    className="transition duration-150 font-bold ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
                  >
                    Register
                  </Link>
                </p>
              </div>
            ) : (
              <div className="text-center md:text-left">
                <p className="mb-0 mt-6 pt-1 text-xs ">
                  {`Already have an account? `}
                  <Link
                    to="/login"
                    className="transition duration-150 font-bold ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
                  >
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
