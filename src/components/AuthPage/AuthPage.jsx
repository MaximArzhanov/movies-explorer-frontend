import React from 'react';
import { Link } from "react-router-dom";
import './AuthPage.css';
import Logo from '../Logo/Logo';
import Form from '../Form/From';

function AuthPage(props) {

  return (
    <div className="auth-page">
      <Logo />
      
      <h2 className="auth-page__title">{props.textTitle}</h2>

      <Form
        textButton={props.textButton}
        onSubmit={props.onSubmit}
        name={props.name}
      >
        {props.children}
      </Form>

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