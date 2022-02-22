import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main(props) {

  /** Записывает в стейт-переменную значение true (Пользователь на странице лендинга)*/
  React.useEffect(() => {
    props.onLandingPage(true);

    return () => {
      props.onLandingPage(false);
    };
  }, []);

  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;