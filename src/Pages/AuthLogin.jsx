import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    console.log(accessToken)

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      console.log("access token in localstorage: ", accessToken)
    }

    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default HandleAuthSuccess;

