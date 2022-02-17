import React from "react";
import AuthPage from "../AuthPage/AuthPage";

function Login(props) {

  /** Записывает имя и адрес ссылки в стейт-переменные */
//   React.useEffect(() => {
//     props.onPage("Регистрация", "/sign-up");
//   }, []);

  return (
    <AuthPage
      textTitle="Рады видеть!"
      textButton="Войти"
      textQuestion="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkRoute="/sign-up"
    />
  );
}

export default Login;