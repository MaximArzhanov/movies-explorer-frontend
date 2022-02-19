import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList isLoading={false}/>
      {
        props.moviesCardListIsFull &&
        <div className="movies__container">
          <button className="movies__button">Ещё</button>
        </div>
      }
    </section>
  );
}

export default Movies;