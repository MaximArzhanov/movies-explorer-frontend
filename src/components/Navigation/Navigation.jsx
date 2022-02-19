import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {

  /** Стейт для открытия бокового меню с навигацией (для экранов менее 1023px) */
  const [isNavigationMenuOpened, setIsNavigationMenuOpened] = React.useState(false);

  /** Закрытие меню навигации при ширине экрана более 1023px */
  React.useEffect(() => {
    const handleResizeScreen = () => {
      if(document.documentElement.clientWidth > 1023 && isNavigationMenuOpened)  {
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
        <div className={classListNavigationContainer}>
          <ul className="navigation__links">

            <li className="navigation__item">
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
      </div>


    </div>
  );
}

export default Navigation;