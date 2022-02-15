import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <Link to="/" className="footer__link">Яндекс.Практикум</Link>
      <Link to="/" className="footer__link">Github</Link>
      <Link to="/" className="footer__link">Facebook</Link>
    </footer>
  );
}

export default Footer;