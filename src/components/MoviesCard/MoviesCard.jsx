import React from 'react';
import './MoviesCard.css';
import { BASE_URL_IMAGE } from '../../utils/config'

function MoviesCard(props) {

  const { nameRU, duration, trailerLink, image } = props.foundMovie;

  const imageUrl = (props.isOnSavedMoviesPage ? image : (BASE_URL_IMAGE.slice(0, -1) + image.url));

  let isMovieSaved = false;
  let savedMovieId = '';
  let classListButton = '';

  if (props.isOnSavedMoviesPage) {
    isMovieSaved = true;
    savedMovieId = props.foundMovie._id;
  } else {
    props.savedMovies.forEach((savedMovie) => {
      if (savedMovie.movieId === props.foundMovie.id) {
        isMovieSaved = true;
        savedMovieId = savedMovie._id;
      }
    });
  }

  if (props.isOnSavedMoviesPage) { // Если открыта страница SavedMovies
    classListButton = isMovieSaved
      ? 'movies-card__button movies-card__button_delete'
      : 'movies-card__button';
  } else {  // Если открыта страница Movies
    classListButton = isMovieSaved
      ? 'movies-card__button movies-card__button_saved'
      : 'movies-card__button';
  }

  function handleClickButton() {
    if (isMovieSaved) { props.handleMovieDelete(savedMovieId); }
    else { props.handleMovieSave(props.foundMovie); }
  }

  return (
    <li className="movies-card">
      <figure className="movie">
        <figcaption className="movie__title">
          {nameRU}
        </figcaption>
        <span className="movie__duration">{duration} минут</span>
        <a
          href={trailerLink}
          target="_blank" rel="noreferrer"
          className="movie__link"
        >
          <img
            src={imageUrl}
            alt="Постер к фильму" className="movie__picture"
          />
        </a>
      </figure>
      <button className={classListButton} onClick={handleClickButton}></button>
    </li>
  );
}

export default MoviesCard;