import React from "react";
import AuthPage from "../AuthPage/AuthPage";

function Register(props) {

  const [name, setName] = React.useState('');

  const [isOnRegisterPage, setIsOnRegisterPage] = React.useState(false);

  /** Записывает name пользователя в стейт-переменную */
  function handleChangeName(e) {
    setName(e.target.value);
  }

  React.useEffect(() => {
    setIsOnRegisterPage(true);
    return () => setIsOnRegisterPage(false);
  }, [])

  return (
    <AuthPage
      textTitle="Добро пожаловать!"
      textButton="Зарегистрироваться"
      textQuestion="Уже зарегистрированы?"
      textLink="Войти"
      linkRoute="/signin"
      onSubmit={props.handleUserRegister}
      name={name}
      isOnRegisterPage={isOnRegisterPage}
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