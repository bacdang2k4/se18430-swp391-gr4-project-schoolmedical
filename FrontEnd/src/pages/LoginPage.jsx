import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";     //Này có thể hiểu là gọi Lgfrom.jsx từ bên compnent qua và return về loginFrom 

const LoginPage = () => {
  return(
        <div>
            <LoginForm />
        </div>
  )
};

export default LoginPage;
