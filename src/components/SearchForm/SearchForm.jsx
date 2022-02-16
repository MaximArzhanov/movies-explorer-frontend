import React from 'react';
import './SearchForm.css';

function SearchForm() {

  const [checkboxOnlyShortMovies, setcheckboxOnlyShortMovies] = React.useState(false);

  /** Записывает значение чекбокса в стейт-переменную */
  function handleChangeCheckbox(e) {
    setcheckboxOnlyShortMovies(e.target.checked);
  }

  return (
    <section className="search-form">
      <form className="form">
        <label className="form__label-search">
          <input className="form__input" type="text" name="name" placeholder="Фильм" />
        </label>
        <button className="form__button" type="submit">
        </button>
        <label className="form__label-filter">
          <input className="form__invisible-checkbox"
                type="checkbox" name="short-movies"
                checked={checkboxOnlyShortMovies} onChange={handleChangeCheckbox} />
          <span className="form__visible-checkbox"></span>
          <span className="form__label-text">Короткометражки</span>
        </label>
      </form>
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;