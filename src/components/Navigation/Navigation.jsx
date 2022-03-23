import React from 'react';
import { NavLink } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {

  /** Стейт для открытия бокового меню с навигацией (для экранов менее 1023px) */
  const [isNavigationMenuOpened, setIsNavigationMenuOpened] = React.useState(false);

  /** Закрытие меню навигации при ширине экрана более 1023px */
  React.useEffect(() => {
    const handleResizeScreen = () => {
      if (document.documentElement.clientWidth > 1023 && isNavigationMenuOpened)  {
          setIsNavigationMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResizeScreen);
    return () => {
      window.removeEventListener('resize', handleResizeScreen);
    }
  }, [isNavigationMenuOpened]);

  /** Закрытие меню навигации нажатием на кнопку Escape */
  React.useEffect(() => {
    const closeNaviagationMenuByEscape = (e) => {
      if (e.key === "Escape" && isNavigationMenuOpened) {
        setIsNavigationMenuOpened(false);
      }
    }

    document.addEventListener("keydown", closeNaviagationMenuByEscape);
    return () => document.removeEventListener("keydown", closeNaviagationMenuByEscape);
  }, [isNavigationMenuOpened]);

  /** Закрытие меню навигации нажатием на "крестик" */
  const handleClickButton = () => {
    setIsNavigationMenuOpened(!isNavigationMenuOpened);
  };

  /** Закрытие меню навигации нажатием на оверлей */
  const handleClickOverlay = () => {
    setIsNavigationMenuOpened(false);
  }

  /** Закрытие меню навигации при нажатии на ссылку */
  const handleLinkClick = () => {
    setIsNavigationMenuOpened(false);
  }

  let classListButton = isNavigationMenuOpened
    ? 'navigation__button navigation__button-close'
    : 'navigation__button';

  /** Добаление класса для синей темы */
  classListButton += (props.headerThemeBlue
   ? ' navigation__button_theme_blue'
   : '');

  const classListNavigationMenu = isNavigationMenuOpened
    ? 'navigation__menu navigation__menu_enabled'
    : 'navigation__menu';

  const classListNavigationContainer = props.headerThemeBlue
    ? 'navigation__container navigation__container_theme_blue'
    : 'navigation__container'; 

  return (
    <div className="navigation">
      <button className={classListButton} onClick={handleClickButton}></button>

      <div className={classListNavigationMenu}>
        <div className="navigation__overlay" onClick={handleClickOverlay}></div>
        <nav className={classListNavigationContainer}>
          <ul className="navigation__links">

            <li className="navigation__item">
              <NavLink
                exact to="/" activeClassName="navigation__link_active"
                className="navigation__link" onClick={handleLinkClick}
              >Главная
              </NavLink>
            </li>

            <li className="navigation__item">
              <NavLink
                to="/movies" activeClassName="navigation__link_active"
                className="navigation__link" onClick={handleLinkClick}
              >Фильмы</NavLink>
            </li>

            <li className="navigation__item">
              <NavLink
                to="/saved-movies" activeClassName="navigation__link_active"
                className="navigation__link" onClick={handleLinkClick}
              >Сохранённые фильмы</NavLink>
            </li>

            <li className="navigation__item">
              <NavLink
                to="/profile" activeClassName="navigation__link_active"
                className="navigation__link navigation__link_type_account-link"
                onClick={handleLinkClick}
              >Аккаунт
                <div className="account-link__icon"></div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>


    </div>
  );
}

export default Navigation;