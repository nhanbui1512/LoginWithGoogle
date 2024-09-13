import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const App = () => {
  const handleGoogleSuccess = async (credentialResponse) => {
    const decodedToken = jwt_decode(credentialResponse.credential);
    console.log("Google User Info:", decodedToken);

    // Gửi token đến server để xác thực và đăng nhập
    const res = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    });

    const data = await res.json();
    console.log("Server response:", data);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </div>
  );
};

export default App;
