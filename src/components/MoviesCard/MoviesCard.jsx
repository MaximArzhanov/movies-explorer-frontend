import React from 'react';
import './MoviesCard.css';
// import moviePicture from '../../images/movie-picture-1.png'
import { baseUrlForImage } from '../../utils/constants';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {

  // /** Текущий пользователь */
  // const currentUser = React.useContext(CurrentUserContext);

  const { nameRU, duration, trailerLink, image } = props.foundMovie;

  // console.log(props.foundMovie);

  const imageUrl = (props.isOnSavedMoviePage ? image : (baseUrlForImage.slice(0, -1) + image.url));

  let isMovieSaved = false;
  let savedMovieId = '';
  let classListButton = '';

  if (props.isOnSavedMoviePage) {
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

  if (props.isOnSavedMoviePage) { // Если открыта страница Movies
    classListButton = isMovieSaved
      ? 'movies-card__button movies-card__button_delete'
      : 'movies-card__button';
  } else {  // Если открыта страница SavedMovies
    classListButton = isMovieSaved
      ? 'movies-card__button movies-card__button_saved'
      : 'movies-card__button';
  }

  function handleClickButton() {
    if (isMovieSaved) { props.handleMovieDelete(savedMovieId); }
    else { props.handleMovieSave(props.foundMovie); }
  }

  console.log('123');

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