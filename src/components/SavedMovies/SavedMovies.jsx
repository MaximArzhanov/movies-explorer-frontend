import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const buttonContent = 'savedMovie';

function SavedMovies() {

  return (
    <section className="saved-movies">
        <SearchForm />
        <MoviesCardList buttonContent={buttonContent}/>
    </section>
  );
}

export default SavedMovies;