import React from 'react';
import './SearchForm.css';

function SearchForm() {

  const [checkboxOnlyShortMovies, setcheckboxOnlyShortMovies] = React.useState(false);

  /** Записывает значение чекбокса в стейт-переменную */
  function handleChangeCheckbox(e) {
    setcheckboxOnlyShortMovies(e.target.checked);
  }

  return (
    <section className="search-form-container">
      <form className="search-form">

        <div className="search-form__box">
          <label className="search-form__label-search">
            <input className="search-form__input" type="text" name="name" placeholder="Фильм" />
          </label>
          
          <button className="search-form__button" type="submit">
          </button>
        </div>


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