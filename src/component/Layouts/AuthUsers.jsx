import { Link } from "react-router-dom";

const AuthUsers = ({ children, type }) => {
  return (
    <section className="container relative mx-auto flex h-screen w-full justify-center bg-[#ffffff]">
      <Link
        to="/"
        className="absolute left-0 top-10 flex items-center gap-1 rounded-full bg-slate-700 bg-opacity-75 px-3 py-2 text-xs font-semibold text-white transition duration-300 hover:scale-105 hover:bg-opacity-100 max-xl:hidden"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="-3 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="icomoon-ignore"> </g>{" "}
            <path
              d="M13.114 2.887c-7.243 0-13.114 5.871-13.114 13.113s5.871 13.113 13.114 13.113c7.242 0 13.112-5.871 13.112-13.113s-5.87-13.113-13.112-13.113zM13.114 28.064c-6.653 0-12.065-5.412-12.065-12.064s5.412-12.063 12.065-12.063c6.652 0 12.063 5.412 12.063 12.063s-5.411 12.064-12.063 12.064z"
              fill="#ffffff"
            >
              {" "}
            </path>{" "}
            <path
              d="M12.318 10.363l-0.742-0.742-6.379 6.379 6.379 6.379 0.742-0.742-5.113-5.113h12.726v-1.049h-12.726z"
              fill="#ffffff"
            >
              {" "}
            </path>{" "}
          </g>
        </svg>
        Back To Home
      </Link>
      <div className="flex h-full items-center justify-center gap-3 max-md:flex-col md:justify-evenly">
        <div className="mb-4 shrink-0 basis-auto md:max-w-xl">
          {type == "login" ? (
            <img
              src="images/login.webp"
              width={300}
              height={300}
              className="md:w-96"
              alt="Sample image"
              loading="lazy"
            />
          ) : (
            <img
              src="images/register.webp"
              width={280}
              height={280}
              className="md:w-96"
              alt="Sample image"
              loading="lazy"
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
