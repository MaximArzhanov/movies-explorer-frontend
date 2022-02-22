import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  // const headerClassList = `header ${props.headerThemeDark ? "header_theme_dark" : ""}`;
  const headerClassList = props.headerThemeBlue
   ? 'header header_theme_blue'
   : 'header';

  return (
    <header className={headerClassList}>
      <Logo />

      { props.loggedIn 
          ? <Navigation headerThemeBlue={props.headerThemeBlue}/> 
          : <div className="header__container">
              <Link to="/signup" className="header__link">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_type_green-button">Войти</Link>
            </div>
      }

    </header>
  );
}

export default Header;