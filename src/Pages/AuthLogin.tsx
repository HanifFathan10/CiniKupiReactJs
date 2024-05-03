import { useToast } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HandleAuthSuccess = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken: string = urlParams.get("access_token") || "";
    const id = "Login";

    localStorage.setItem("access_token", accessToken);
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
