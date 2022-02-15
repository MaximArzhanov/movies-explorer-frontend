import React from 'react';
import { Link } from 'react-router-dom';
import './Promo.css';

function Promo() {

  return (
    <section className="promo">
        <div className="promo__container">
            <h1 className="promo__title">
                Учебный проект студента факультета
                Веб‑разработки.
            </h1>
            <h2 className="promo__subtitle">
                Листайте ниже, чтобы узнать больше
                про этот проект&nbsp;и&nbsp;его&nbsp;создателя
            </h2>
            <Link to="/" className="promo__link">Узнать больше</Link>
        </div>
        <div className="promo__image"></div>
    </section>
  );
}

export default Promo;