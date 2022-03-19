import React from 'react';
import { useCallback } from "react";
import './SearchForm.css';

function SearchForm(props) {

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const keyWordRef = React.useRef();

  const [checkboxOnlyShortMovies, setcheckboxOnlyShortMovies] = React.useState(false);

  function searchMovies() {

  }

  /** Записывает значение чекбокса в стейт-переменную */
  function handleChangeCheckbox(e) {
    setcheckboxOnlyShortMovies(e.target.checked);
  }

  React.useEffect(() => {
    setError(props.messageFromApi);
  }, [props.messageFromApi]);

  function handleSubmit(e) {
    e.preventDefault();
    if (checkValidation()) {
      props.getMoviesFromBeatfilmApi(keyWordRef.current.value);
    }
  }

  /** Проверяет валидность поля (На наличие текста) */
  function checkValidation() {
    if (keyWordRef.current.value === '') {
      setError('Нужно ввести ключевое слово');
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
            />
          </label>
          
          <button className="search-form__button" type="submit">
          </button>
        </div>

        <span className="search-form__error-text">{error}</span>

        <label className="search-form__label-filter">
          <input className="search-form__invisible-checkbox"
            type="checkbox" name="short-movies"
            checked={checkboxOnlyShortMovies} onChange={handleChangeCheckbox}
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