import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {

  return (
    <header className="header">
      <Link to="/" className="header__logo"></Link>
      <div className="header__container">
        <Link to="/" className="header__link header__link_size_m">Фильмы</Link>
        <Link to="/" className="header__link header__link_size_m">Сохранённые фильмы</Link>
      </div>
      <div className="header__container">
        <Link to="/" className="header__link">Регистрация</Link>
        <Link to="/" className="header__link header__link_type_green-button">Войти</Link>
      </div>
    </header>
  );
}

export default Header;