import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomToast } from "../Hooks/useToast";

const HandleAuthSuccess = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const { SuccessToast } = useCustomToast();

    sessionStorage.setItem("access_token", accessToken!);
    Navigate("/", {
      replace: true,
      preventScrollReset: true,
      unstable_viewTransition: true,
    });

    SuccessToast({
      id: "auth-success",
      title: "Login Success",
    });
  }, [Navigate]);

  return (
    <>
      <p>Redirecting.....</p>
    </>
  );
};

export default HandleAuthSuccess;
