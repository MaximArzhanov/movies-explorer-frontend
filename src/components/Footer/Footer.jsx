import React from 'react';
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <p className="header__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <span className="header__copyright">&copy; 2022</span>
      <ul className="footer__links">
        <a href="https://practicum.yandex.ru/" className="footer__link" 
              target="_blank" rel="noreferrer">Яндекс.Практикум
        </a>
        <a href="https://github.com/MaximArzhanov" className="footer__link"
              target="_blank" rel="noreferrer">Github
        </a>
        <a href="https://ru-ru.facebook.com/yandex.practicum/" className="footer__link"
              target="_blank" rel="noreferrer">Facebook
        </a>
      </ul>
    </footer>
  );
}

export default Footer;