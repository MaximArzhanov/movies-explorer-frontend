import React from "react";
import AuthPage from "../AuthPage/AuthPage";

function Register(props) {

  /** Записывает имя и адрес ссылки в стейт-переменные */
//   React.useEffect(() => {
//     props.onPage("Регистрация", "/sign-up");
//   }, []);

  return (
    <AuthPage
      textTitle="Добро пожаловать!"
      textButton="Зарегистрироваться"
      textQuestion="Уже зарегистрированы?"
      textLink="Войти"
      linkRoute="/sign-in"
    >
      <span className="form__title-input">Имя</span>
      <input
        id="name-input"
        className="form__input"
        type="text"
        name="name"
        required
      />
    </AuthPage>
  );
}

export default Register;