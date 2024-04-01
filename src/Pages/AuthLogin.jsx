import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HandleAuthSuccess = () => {
  const navigate = useNavigate();
  const id = "Login";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    console.log(accessToken);

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      console.log("access token in localstorage: ", accessToken);
    }

    if (!toast.isActive(id)) {
      toast({
        id,
        title: "Login Berhasil!!!",
        containerStyle: {
          marginTop: "80px",
          fontSize: "12px",
        },
        status: "success",
        position: "top",
        variant: "top-accent",
        isClosable: true,
      });
    }

    navigate("/");
  }, [navigate]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default HandleAuthSuccess;
