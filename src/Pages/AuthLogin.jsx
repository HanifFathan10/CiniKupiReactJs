import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HandleAuthSuccess = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const id = "Login";

    sessionStorage.setItem("access_token", accessToken);
    navigate("/");

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
  }, [navigate]);

  return (
    <>
      <p>Redirecting.....</p>
    </>
  );
};

export default HandleAuthSuccess;
