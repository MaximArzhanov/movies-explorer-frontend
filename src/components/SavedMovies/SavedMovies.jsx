import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore';

const buttonContent = 'savedMovie';

function SavedMovies(props) {

  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList buttonContent={buttonContent} isLoading={true}/>
      { props.moviesCardListIsFull && <ButtonLoadMore /> }
    </section>
  );
}

export default SavedMovies;