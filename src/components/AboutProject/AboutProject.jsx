import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle'

function AboutProject(props) {

  return (
    <section id="about-project" className="about-project">
      <SectionTitle titleText="О проекте" />
      <div className="about-project__text-content">
        <aside className="about-project__container">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </aside>

        <aside className="about-project__container">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </aside>
      </div>
      
      <div className="about-project__time-bar">
        <p className="about-project__time-line about-project__time-line_color_green">
          1 неделя
        </p>
        <p className="about-project__time-line">4 недели</p>
        <span className="about-project__skill">Back-end</span>
        <span className="about-project__skill">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;