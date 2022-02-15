import React from 'react';
import './Portfolio.css';
import '../styles.css'

function Portfolio() {

  return (
    <section className="portfolio">
        <h2 className="section-title section-title_size_small">
            Портфолио
        </h2>
        <ul className="portfolio__list">
            <li className="portfolio__item">
                <a href="https://github.com/MaximArzhanov/how-to-learn"
                   className="portfolio__link" target="_blank" rel="noreferrer">
                       Статичный сайт
                    <div className="portfolio__icon-link"></div>
                </a>
            </li>
            <li className="portfolio__item">
                <a href="https://github.com/MaximArzhanov/kuda-ya-poedu"
                   className="portfolio__link" target="_blank" rel="noreferrer">
                       Адаптивный сайт
                    <div className="portfolio__icon-link"></div>
                </a>
            </li>
            <li className="portfolio__item">
                <a href="https://github.com/MaximArzhanov/react-mesto-auth"
                   className="portfolio__link" target="_blank" rel="noreferrer">
                       Одностраничное приложение
                    <div className="portfolio__icon-link"></div>
                </a>
            </li>
        </ul>
    </section>
  );
}

export default Portfolio;