import React from "react";
import AuthPage from "../AuthPage/AuthPage";

function Login(props) {

  return (
    <AuthPage
      textTitle="Рады видеть!"
      textButton="Войти"
      textQuestion="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkRoute="/signup"
    />
  );
}

export default Login;