import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation() {

  return (
    <div className="navigation">
      <ul className="navigation__links">

        <li className="navigation__item navigation__item_visibility_small-screen">
          <Link to="/"
                className="navigation__link">
            Главная
          </Link>
        </li>

        <li className="navigation__item">
          <Link to="/" className="navigation__link">Фильмы</Link>
        </li>

        <li className="navigation__item">
          <Link to="/" className="navigation__link">Сохранённые фильмы</Link>
        </li>

        <li className="navigation__item">
          <Link to="/" className="navigation__link account-link">Аккаунт</Link>
        </li>

      </ul>
    </div>
  );
}

export default Navigation;