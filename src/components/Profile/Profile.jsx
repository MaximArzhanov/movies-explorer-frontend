import React from 'react';
import { useCallback } from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const nameRef = React.useRef();

  /** Текущий пользователь */
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [isEditProfile, setIsEditProfile] = React.useState(false);

  /** Формирует список классов для кнопки отправки формы */
  const createClassListButton = () => {
    if (isEditProfile) {
      if (props.isLoading) {
        return 'profile-form__button profile-form__button_theme_blue profile-form__button_disabled';
      } else {
        return (isValid
          ? 'profile-form__button profile-form__button_theme_blue'
          : 'profile-form__button profile-form__button_theme_blue profile-form__button_disabled');
      }
    } else {
      return 'profile-form__button';
    }
  };

  const classListLink = isEditProfile
    ? 'profile__link_disabled'
    :  'profile__link';

  const classListInput = isEditProfile
  ? 'profile-form__input'
  : 'profile-form__input profile-form__input_inactive';

  const buttonText = isEditProfile
    ? 'Сохранить'
    : 'Редактировать';

  const classListTextResultFromApi = (props.messageFromApi === 'Информация успешно обновлена')
    ? 'profile-form__text-result'
    : 'profile-form__text-result profile-form__text-result_type_error';
  
  /** Записывает информацию о пользователе в стейт-переменные */
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  /** Выполняется логика сохранения данных профиля
   *  или выполняется переход к редактированию профиля */
  function handleClickButton(evt) {
    evt.preventDefault();
    if (isEditProfile) {
      saveDataProfile();
      setIsEditProfile(false);
    }
    else {
      nameRef.current.focus();
      props.resetMessageFromApi();
      setIsEditProfile(true);
    }
  };

  /** Отправляет запрос к Api. Сохраняет информацию о пользователе */
  function saveDataProfile() {
    props.handleUpdateUser({ name, email });
  };

  /** Записывает имя пользователя в стейт-переменную */
  function handleChangeName(evt) {
    setName(evt.target.value);
    handleChange(evt);
  }

  /** Записывает email пользователя в стейт-переменную */
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    handleChange(evt);
  }
  
  /** Выходит из аккаунта */
  function signOut() {
    props.handleSignOutClick();
  }

  React.useEffect(() => {
    return () => {
      resetForm();
      props.resetMessageFromApi();
    }
  }, []);

  /** Валидация полей формы */
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  console.log(currentUser);

  return (
    <div className="profile">
      <h2 className="profile__title">Привет {currentUser.name}</h2>

      <form className="profile-form">

        <div className="profile-form__container">
          <input
            id="name-input"
            className={classListInput}
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={30}
            value={name || ""}
            onChange={handleChangeName}
            placeholder="Имя"
            ref={nameRef}
            autoComplete="off"
          />
          {!isEditProfile &&
          <span className="profile-form__current-value">{currentUser.name}</span>}
        </div>
        <span className="profile-form__error-input">{errors.name}</span>

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
            autoComplete="off"
          />
          {!isEditProfile &&
          <span className="profile-form__current-value">{currentUser.email}</span>}
        </div>
        <span className="profile-form__error-input">{errors.email}</span>
        
        <span className={classListTextResultFromApi}>{props.messageFromApi}</span>
        <button className={createClassListButton()} type="submit" onClick={handleClickButton}>
          {buttonText}
        </button>
      </form>

      <Link to="/" className={classListLink} onClick={signOut}>
          Выйти из аккаунта
      </Link>
    </div>
  );
}

export default Profile;