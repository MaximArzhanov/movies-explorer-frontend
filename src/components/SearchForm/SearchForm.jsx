import React from 'react';
import './SearchForm.css';

import {
  TEXT_OF_QUERY_ON_MOVIE_PAGE,
  CHECKBOX_STATE_ON_MOVIE_PAGE,
  MESSAGE_NEED_ENTER_KEYWORD
} from '../../utils/config'

let isMoviesWereShowed = false;

function SearchForm(props) {

  const [error, setError] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const keyWordRef = React.useRef();
  const checkboxRef = React.useRef();

  const [checkboxOnlyShortMovies, setСheckboxOnlyShortMovies] = React.useState(false);

  /** Если карточки уже были отрисованы на странцие */
  if (props.foundMovies.length !== 0) {
    isMoviesWereShowed = true;
  }

  /** Записывает значение чекбокса в стейт-переменную */
  function handleChangeCheckbox(e) {
    setСheckboxOnlyShortMovies(e.target.checked);
    if (isMoviesWereShowed) {
      props.handleSubmitSearch(keyWordRef.current.value, checkboxRef.current.checked);
    }
  }

  React.useEffect(() => {
    setError(props.messageFromApi);
  }, [props.messageFromApi]);

  React.useEffect(() => {
    if (props.isOnMoviesPage) {
      const textOfQuery = localStorage.getItem(TEXT_OF_QUERY_ON_MOVIE_PAGE);
      const checkBoxState = JSON.parse(localStorage.getItem(CHECKBOX_STATE_ON_MOVIE_PAGE));
      if (textOfQuery) { keyWordRef.current.value = textOfQuery; }
      if (checkBoxState) { setСheckboxOnlyShortMovies(checkBoxState); }
    }
  }, [props.isOnMoviesPage]);

  function handleSubmit(e) {
    e.preventDefault();
    if (checkValidation()) {
      if (props.isOnMoviesPage) { props.resetBufferFoundMovies(); }
      props.handleSubmitSearch(keyWordRef.current.value, checkboxOnlyShortMovies);
    }
  }

  /** Проверяет валидность поля (На наличие текста) */
  function checkValidation() {
    if (keyWordRef.current.value === '') {
      setError(MESSAGE_NEED_ENTER_KEYWORD);
      setIsValid(false);
      return false;
    } else {
      setError('');
      setIsValid(true);
      return true;
    }
  }

  return (
    <section className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit} noValidate>

        <div className="search-form__box">
          <label className="search-form__label-search">
            <input
              className="search-form__input"
              type="text"
              name="name"
              placeholder="Фильм"
              ref={keyWordRef}
              autoComplete="off"
            />
          </label>
          
          <button className="search-form__button" type="submit">
          </button>
        </div>

        <span className="search-form__error-text">{error}</span>

        <label className="search-form__label-filter">
          <input className="search-form__invisible-checkbox"
            type="checkbox" name="short-movies"
            checked={checkboxOnlyShortMovies} onChange={handleChangeCheckbox} ref={checkboxRef}
          />
          <span className="search-form__visible-checkbox"></span>
          <span className="search-form__label-text">Короткометражки</span>
        </label>

      </form>
      <div className="search-form-container__line"></div>
    </section>
  );
}

export default SearchForm;