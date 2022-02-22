import React from 'react';
import { Link } from "react-router-dom";
import './Profile.css';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile(props) {

  /** Текущий пользователь */
  //const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [isEditProfile, setIsEditProfile] = React.useState(false);

  const classListButton = isEditProfile
    ? 'profile-form__button profile-form__button_theme_blue'
    : 'profile-form__button';

  const classListLink = isEditProfile
    ? 'profile__link_disabled'
    :  'profile__link';

  const classListInput = isEditProfile
  ? 'profile-form__input'
  : 'profile-form__input profile-form__input_inactive';

  const buttonText = isEditProfile
    ? 'Сохранить'
    : 'Редактировать';

  /** Записывает информацию о пользователе в стейт-переменные */
  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setEmail(currentUser.email);
  // }, [currentUser]);

  /** Выполняется логика сохранения данных профиля
   *  или выполняется переход к редактированию профиля */
  function handleClickButton(evt) {
    evt.preventDefault();
    if (isEditProfile) { saveDataProfile(); }
    else { setIsEditProfile(true); }
  };

  /** Отправляет запрос к Api. Сохраняет информацию о пользователе */
  function saveDataProfile() {
    //props.onEditProfile({ name, email });
  };

  /** Записывает имя пользователя в стейт-переменную */
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  /** Записывает email пользователя в стейт-переменную */
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>

      <form className="profile-form">

        <div className="profile-form__container">
          <input
            id="name-input"
            className={classListInput}
            type="text"
            name="name"
            required
            value={name || ""}
            onChange={handleChangeName}
            placeholder="Имя"
          />
          <span className="profile-form__current-value">Виталий{/*currentUser.name*/}</span>
        </div>

        <div className="profile-form__container">
          <input
            id="email-input"
            className={classListInput}
            type="email"
            name="email"
            required
            value={email || ""}
            onChange={handleChangeEmail}
            placeholder="Email"
          />
          <span className="profile-form__current-value">pochta@yandex.ru{/*currentUser.email*/}</span>
        </div>
        
        <span className="profile-form__text-result">При обновлении профиля произошла ошибка</span>
        <button className={classListButton} type="submit" onClick={handleClickButton}>
          {buttonText}
        </button>
      </form>

      <Link to="/" className={classListLink}>
          Выйти из аккаунта
      </Link>
    </div>
  );
}

export default Profile;