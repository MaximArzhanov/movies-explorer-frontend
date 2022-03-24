import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

function MoviesCardList(props) {

  return (
    <>
      <ul className="movies-card-list">
        {
          props.foundMovies.map(({ ...foundMovie }, index) => (
            <MoviesCard
              key={index}
              foundMovie={{ ...foundMovie }}
              handleMovieSave={props.handleMovieSave}
              handleMovieDelete={props.handleMovieDelete}
              isOnSavedMoviesPage={props.isOnSavedMoviesPage}
              savedMovies={props.savedMovies}
            ></MoviesCard>
          ))
        }
      </ul>
      { 
        props.isMoviesCardListFull &&
        <ButtonLoadMore handleClickButtonLoadMore={props.handleClickButtonLoadMore}/>
      }
    </>
  );
}

export default MoviesCardList;