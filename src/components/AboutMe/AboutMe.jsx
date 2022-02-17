import React from 'react';
import './AboutMe.css';
import '../styles.css'
import photo from '../../images/photo.png'

function AboutMe() {

  return (
    <section className="about-me">

      <h2 className="section-title">
        Студент
      </h2>

      <div className="about-me__container">

        <div className="about-me__info">
          <h3 className="about-me__subtitle">Максим</h3>
          <p className="about-me__description">Начинающий фронтенд-разработчик, 28 лет</p>
          <p className="about-me__paragraph">
            Прохожу курс по веб-разработке.
            Стремлюсь создавать качественные интерфейсы.
            В&nbsp;свободное время люблю смотреть кино, гулять и играть в настольные игры.
          </p>

          <ul className="about-me__contacts">
            <li className="about-me__item">
              <a href="https://github.com/MaximArzhanov"
                 target="_blank" rel="noreferrer"
                 className="about-me__link">GitHub
              </a>
            </li>
            <li className="about-me__item">
              <a href="https://t.me/MaximArzhanov"
                 target="_blank" rel="noreferrer"
                 className="about-me__link">Telegram</a>
            </li>
          </ul>
        </div>

        <img src={photo}
             alt="Аржанов Максим - начинающий фронтенд разработчик" 
             className="about-me__photo" />

      </div>
    </section>
  );
}

export default AboutMe;