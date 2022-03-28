import React from 'react';
import { useCallback } from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { checkEmailIsFormat } from '../../utils/utils'
import { MESSAGE_EMAIL_MUST_MATCH_FORMAT, MESSAGE_EDIT_PROFILE_SUCCESS } from '../../utils/config'

function Profile(props) {

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const buttonRef = React.useRef();

  /** Текущий пользователь */
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  /** Значение true если страница в состоянии редактирования профиля
   *  Значение false если страница в состоянии просмотра данных профиля */
  const [isEditProfile, setIsEditProfile] = React.useState(false);

  const [isDataNotEquals, setIsDataNotEquals] = React.useState(false);

  /** Формирует список классов для кнопки отправки формы */
  const createClassListButton = () => {
    if (isEditProfile) {
      if (props.isLoading) {
        return 'profile-form__button profile-form__button_theme_blue profile-form__button_disabled';
      } else {
        return ((isValid && isDataNotEquals)
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

  const classListTextResultFromApi = (props.messageFromApi === MESSAGE_EDIT_PROFILE_SUCCESS)
    ? 'profile-form__text-result'
    : 'profile-form__text-result profile-form__text-result_type_error';
  
  /** Записывает информацию о пользователе в стейт-переменные */
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  /** Проверяет не соответствует ли введённая информация текущим данным пользователя */
  function checkIsDataNotEquals() {
    if (currentUser.name !== nameRef.current.value || currentUser.email !== emailRef.current.value) {
      setIsDataNotEquals(true);
    } else {
      setIsDataNotEquals(false);
    }
  }

  /** Выполняется логика сохранения данных профиля
   *  или выполняется переход к редактированию профиля */
  function handleClickButton(evt) {
    evt.preventDefault();
    if (isEditProfile) {
      buttonRef.current.focus();
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

  /** При размонтировании компонента сбросить поля формы и текст сообщения от Api */
  React.useEffect(() => {
    return () => {
      resetForm();
      props.resetMessageFromApi();
    }
  }, []);

  /** Валидация полей формы */
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    if (emailRef.current.validity.valid) {
      if (checkEmailIsFormat(emailRef.current.value)) { // Дополнительная валидация поля email
        setIsValid(true);
        setIsValid(target.closest("form").checkValidity());
        setErrors({...errors, [name]: target.validationMessage });
      } else {
        setIsValid(false);
        setErrors({...errors, [emailRef.current.name]: MESSAGE_EMAIL_MUST_MATCH_FORMAT });
      }
    }
    checkIsDataNotEquals();
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

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
            ref={emailRef}
            autoComplete="off"
          />
          {!isEditProfile &&
          <span className="profile-form__current-value">{currentUser.email}</span>}
        </div>
        <span className="profile-form__error-input">{errors.email}</span>
        
        <span className={classListTextResultFromApi}>{props.messageFromApi}</span>
        <button
          className={createClassListButton()}
          type="submit" onClick={handleClickButton}
          ref={buttonRef}
        >
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