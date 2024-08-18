import React, { useEffect } from "react";
import { useCustomToast } from "../Hooks/useToast";

const HandleAuthSuccess = () => {
  const { SuccessToast } = useCustomToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      sessionStorage.setItem("access_token", accessToken);
      SuccessToast({
        id: "auth-success",
        title: "Login Success",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      console.error("Access token not found in URL parameters.");
    }
  }, [SuccessToast]);

  return (
    <>
      <p>Redirecting.....</p>
    </>
  );
};

export default HandleAuthSuccess;
