import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

function MoviesCardList(props) {

  const [moviesCardListIsFull, setMoviesCardListIsFull] = React.useState(false);

  return (
    <>
      <ul className="movies-card-list">
        {/* <MoviesCard buttonContent={props.buttonContent}/> */}
        {props.foundMovies.map(({ ...foundMovie }, index) => (
            <MoviesCard
              // key={props.isOnMoviePage ? foundMovie._id : foundMovie.id}
              key={index}
              foundMovie={{ ...foundMovie }}
              handleMovieSave={props.handleMovieSave}
              handleMovieDelete={props.handleMovieDelete}
              isOnSavedMoviePage={props.isOnSavedMoviePage}
              // savedMovie={props.savedMovie}
              savedMovies={props.savedMovies}
              // isMovieSaved={test({ ...movie })}
            ></MoviesCard>
          ))}
      </ul>
      { moviesCardListIsFull && <ButtonLoadMore /> }
    </>
  );
}

export default MoviesCardList;