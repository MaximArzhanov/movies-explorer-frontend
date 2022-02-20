import React from 'react';
import { useHistory } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound() {

  const history = useHistory();

  function handleButtonClick() {
    history.goBack();
  }

  return (
    <div className="page-not-found">
        <h1 className="page-not-found__code">404</h1>
        <h2 className="page-not-found__message">Страница не найдена</h2>
        <button className="page-not-found__button" onClick={handleButtonClick}>Назад</button>
    </div>
  );
}

export default PageNotFound;