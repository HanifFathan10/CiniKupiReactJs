import { Link } from "react-router-dom";

const AuthUsers = ({ children, type }) => {
  return (
    <section className="container mx-auto flex h-screen w-full justify-center bg-[#ffffff]">
      <div className="flex h-full items-center justify-center gap-3 max-md:flex-col md:justify-evenly">
        <div className="mb-4 shrink-0 basis-auto md:max-w-xl">
          {type == "login" ? (
            <img
              src="images/login.webp"
              width={300}
              height={300}
              className="md:w-96"
              alt="Sample image"
              fetchpriority="high"
            />
          ) : (
            <img
              src="images/register.webp"
              width={280}
              height={280}
              className="md:w-96"
              alt="Sample image"
              fetchpriority="high"
            />
          )}
        </div>
        <div className="mb-12 w-full  sm:mb-0 md:justify-center">
          {children}
          {type == "login" ? (
            <div className="text-center md:text-left">
              <p className="mb-0 mt-6 pt-1 text-center text-xs">
                {`Don't have an account? `}
                <Link
                  to="/register"
                  className="font-bold transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
                >
                  Register
                </Link>
              </p>
            </div>
          ) : (
            <div className="text-center md:text-left">
              <p className="mb-0 mt-6 pt-1 text-center text-xs">
                {`Already have an account? `}
                <Link
                  to="/login"
                  className="font-bold transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
                >
                  Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthUsers;
