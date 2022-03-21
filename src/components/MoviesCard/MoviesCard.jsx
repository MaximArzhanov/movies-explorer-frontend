import React from 'react';
import './MoviesCard.css';
// import moviePicture from '../../images/movie-picture-1.png'
import { baseUrlForImage } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {

  /** Текущий пользователь */
  const currentUser = React.useContext(CurrentUserContext);

  const { nameRU, duration, trailerLink, image } = props.movie;

  // let classListButton = 'movies-card__button';
  // if (props.buttonContent === 'savedMovie') { classListButton += 'movies-card__button_delete' }

  // const isSaved = (props.savedMovie.movieId === props.movie.id)
  //   ? true
  //   : false;

  const isSaved = props.savedMovies.some((movie) => {
    return (movie.movieId === props.movie.id && movie.owner === currentUser._id);
  });

  const classListButton = isSaved
    ? 'movies-card__button movies-card__button_saved'
    : 'movies-card__button';

  /** Определяет, ставил ли пользователь лайк для текущей карточки */
  // const isSaved = props.savedMovies.forEach((item) => {
  //   console.log('123');
  //   if (props.movie.id === item.movieId) {
  //     if (item.owner === currentUser.data._id) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // });

  // console.log(isSaved);

  // console.log(props.savedMovies);

  function handleClickButton() {
    props.handleMovieSave(props.movie);
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
            src={baseUrlForImage + image.url}
            alt="Постер к фильму" className="movie__picture"
          />
        </a>
      </figure>
      <button className={classListButton} onClick={handleClickButton}></button>
    </li>
  );
}

export default MoviesCard;