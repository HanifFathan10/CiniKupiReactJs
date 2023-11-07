import React, { useEffect, useState } from "react";

function AuthSuccessPage() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);
      window.location.href = "/";
    }
  }, []);

  return <></>;
}

export default AuthSuccessPage;
