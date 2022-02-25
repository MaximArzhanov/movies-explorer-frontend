import React from "react";
import AuthPage from "../AuthPage/AuthPage";

function Register(props) {

  const [name, setName] = React.useState('');

  /** Записывает name пользователя в стейт-переменную */
  function handleChangeName(e) {
    setName(e.target.value);
  }

  return (
    <AuthPage
      textTitle="Добро пожаловать!"
      textButton="Зарегистрироваться"
      textQuestion="Уже зарегистрированы?"
      textLink="Войти"
      linkRoute="/signin"
      onSubmit={props.handleUserRegister}
      name={name}
    >
      <span className="form__title-input">Имя</span>
      <input
        id="name-input"
        className="form__input"
        type="text"
        name="name"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
    </AuthPage>
  );
}

export default Register;