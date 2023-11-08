import React, { useEffect } from "react";

function AuthSuccessPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    window.location.href = accessToken ? "/" : "login";
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-xl text-slate-500">Login Success</h1>
      </div>
    </section>
  );
}

export default AuthSuccessPage;
