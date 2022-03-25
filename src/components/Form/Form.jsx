import React from 'react';
import { useCallback } from "react";
import './Form.css';

function Form(props) {

  const emailRef = React.useRef();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /** Состяние кнопки отправки формы */
  const [isButtonFormPressed, setIsButtonFormPressed] = React.useState(false);

  // Классы для строки с ошибкой от Api
  const textErrorApiClassList = isButtonFormPressed
    ? 'form__text-error-api'
    : 'form__text-error-api form__text-error-api_invisible';

  /** Запрос на регистрацию/авторизацию к API */
  function handleSubmit(e) {
    e.preventDefault();
    if (props.isOnRegisterPage) {
      props.onSubmit(name, email, password);
      setIsButtonFormPressed(true);
    }
    if (props.isOnLoginPage) {
      props.onSubmit(email, password);
      setIsButtonFormPressed(true);
    }
  }

  /** Записывает name пользователя в стейт-переменную */
  function handleChangeName(e) {
    setName(e.target.value);
    handleChange(e);
  }
  
  /** Записывает email пользователя в стейт-переменную */
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    handleChange(e);
  }

  /** Записывает пароль пользователя в стейт-переменную */
  function handleChangePassword(e) {
    setPassword(e.target.value);
    handleChange(e);
  }

  React.useEffect(() => {
    setIsButtonFormPressed(false);

    return () => {
      resetForm();
      props.resetMessageFromApi();
    }
  }, []);

  /** Валидация полей формы */
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if (emailRef.current.validity.valid) {
      if (checkEmailIsFormat(emailRef.current.value)) { // Дополнительная валидация поля email
        setIsValid(true);
        setIsValid(target.closest("form").checkValidity());
        setErrors({...errors, [name]: target.validationMessage });
      } else {
        setIsValid(false);
        setErrors({...errors, [emailRef.current.name]: 'email должен соответствовать формату: user@email.domain' });
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  /** Формирует список классов для кнопки отправки формы */
  const createButtonSubmitClassList = () => {
    if (props.isLoading) {
      return 'form__button form__button_disabled';
    } else {
      return (isValid ? 'form__button' : 'form__button form__button_disabled');
    }
  };

  function checkEmailIsFormat(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email);
  }

  /** Убирает всплывающее сообщение валидации */
  function removeDefaultMessageValidation(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>

      {/* Дополнительное поле для страницы регистрации */}
      {(props.isOnRegisterPage) && 
      <>
        <span className="form__title-input">Имя</span>
        <input
          id="name-input"
          className="form__input"
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={30}
          value={name || ""}
          onChange={handleChangeName}
          autoComplete="off"
        />
        <span className="form__error-input">{errors.name}</span>
      </>}

      <span className="form__title-input">E-mail</span>
      <input
          id="email-input"
          className="form__input"
          type="email"
          name="email"
          required
          value={email || ""}
          onChange={handleChangeEmail}
          autoComplete="off"
          ref={emailRef}
          // pattern='test@test'
      />
      <span className="form__error-input">{errors.email}</span>
      
      <span className="form__title-input">Пароль</span>
      <input
          id="password-input"
          className="form__input"
          type="password"
          name="password"
          required
          value={password || ""}
          onChange={handleChangePassword}
          autoComplete="off"
      />
      <span className="form__error-input">{errors.password}</span>

      <span className={textErrorApiClassList}>{props.messageFromApi}</span>
      <button className={createButtonSubmitClassList()} type="submit">
          {props.isLoading
            ? (props.textButton + '...')
            : props.textButton}
      </button>
    </form>
  );
}

export default Form;