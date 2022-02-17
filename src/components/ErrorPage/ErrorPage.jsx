import React from 'react';
import { Link } from "react-router-dom";
import './ErrorPage.css';

function ErrorPage() {

  return (
    <div className="error-page">
        <h1 className="error-page__code">404</h1>
        <h2 className="error-page__message">Страница не найдена</h2>
        <Link to="/" className="error-page__link">Назад</Link>
    </div>
  );
}

export default ErrorPage;