import React from 'react';
import { Link } from "react-router-dom";
import './Profile.css';

function Profile(props) {

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>

      <form className="profile-form">

        <div className="profile-form__container">
          <input
              id="name-input"
              className="profile-form__input"
              type="text"
              name="name"
              required
              placeholder="Имя"
          />
          <span className="profile-form__current-value">Виталий</span>
        </div>

        <div className="profile-form__container">
          <input
            id="email-input"
            className="profile-form__input"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <span className="profile-form__current-value">pochta@yandex.ru</span>
        </div>

        <span className="profile-form__text-error">Что-то пошло не так...</span>

        <button className="profile-form__button" type="submit">
          Редактировать
        </button>
      </form>

      <Link to="/" className="profile__link">
          Выйти из аккаунта
      </Link>
    </div>
  );
}

export default Profile;