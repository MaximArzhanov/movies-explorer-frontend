import React from 'react';
import { Link } from "react-router-dom";
import './AuthPage.css';

function AuthPage(props) {

  return (
    <div className="auth-page">
      <Link to="/" className="logo"></Link>
      <h2 className="auth-page__title">{props.textTitle}</h2>
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
          minLength="2"
          maxLength="200"
        />
        <span className="form__text-error">Что-то пошло не так...</span>
        <button className="form__button" type="submit">
          {props.textButton}
        </button>
      </form>
      <div className="auth-page__container">
        <span className="auth-page__question">{props.textQuestion}</span>
        <Link to={props.linkRoute} className="auth-page__link">
          {props.textLink}
        </Link>
      </div>
    </div>
  );
}

export default AuthPage;