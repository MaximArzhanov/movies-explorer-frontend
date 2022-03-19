import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

function Movies(props) {

  const [moviesCardListIsFull, setMoviesCardListIsFull] = React.useState(false);

  return (
    <section className="movies">
      <SearchForm
        getMoviesFromBeatfilmApi={props.getMoviesFromBeatfilmApi}
        messageFromApi={props.messageFromApi}
      />
      <MoviesCardList isLoading={props.isLoading} movies={props.movies}/>
      { moviesCardListIsFull && <ButtonLoadMore /> }
    </section>
  );
}

export default Movies;