import React from 'react';
import './Form.css';

function Form(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /** Запрос на регистрацию/авторизацию к API */
  function handleSubmit(e) {
    e.preventDefault();
    console.log(props.isOnRegisterPage);
    console.log(props.isOnLoginPage);
    if (props.isOnRegisterPage) { props.onSubmit(props.name, email, password); }
    if (props.isOnLoginPage) { props.onSubmit(email, password); }
  }
    

  /** Записывает email пользователя в стейт-переменную */
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  /** Записывает пароль пользователя в стейт-переменную */
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {props.children}
      <span className="form__title-input">E-mail</span>
      <input
          id="email-input"
          className="form__input"
          type="email"
          name="email"
          required
          value={email || ""}
          onChange={handleChangeEmail}
      />
      
      <span className="form__title-input">Пароль</span>
      <input
          id="password-input"
          className="form__input"
          type="password"
          name="password"
          required
          value={password || ""}
          onChange={handleChangePassword}
      />
      <span className="form__text-error">Что-то пошло не так...</span>
      <button className="form__button" type="submit">
          {props.textButton}
      </button>
    </form>
  );
}

export default Form;