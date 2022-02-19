import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList isLoading={false}/>
      { props.moviesCardListIsFull && <ButtonLoadMore /> }
    </section>
  );
}

export default Movies;