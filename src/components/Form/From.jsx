import React from 'react';
import './Form.css';

function Form(props) {

  return (
    <form className="form">
      {props.children}
      <span className="form__title-input">E-mail</span>
      <input
          id="email-input"
          className="form__input"
          type="email"
          name="email"
          required
      />
      
      <span className="form__title-input">Пароль</span>
      <input
          id="password-input"
          className="form__input"
          type="password"
          name="password"
          required
      />
      <span className="form__text-error">Что-то пошло не так...</span>
      <button className="form__button" type="submit">
          {props.textButton}
      </button>
    </form>
  );
}

export default Form;