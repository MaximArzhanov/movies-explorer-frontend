import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <p className="header__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <span className="header__copyright">&copy; 2022</span>
      <ul className="footer__links">
        <Link to="/" className="footer__link">Яндекс.Практикум</Link>
        <Link to="/" className="footer__link">Github</Link>
        <Link to="/" className="footer__link">Facebook</Link>
      </ul>
    </footer>
  );
}

export default Footer;