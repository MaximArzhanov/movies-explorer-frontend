import React from 'react';
import './MoviesCard.css';
// import moviePicture from '../../images/movie-picture-1.png'
import { baseUrlForImage } from '../../utils/constants';

function MoviesCard(props) {

  const { nameRU, duration, trailerLink, image } = props.movie;

  let classListButton = 'movies-card__button movies-card__button_saved ';
  if (props.buttonContent === 'savedMovie') { classListButton += 'movies-card__button_delete' }

  // console.log(image);

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
      <button className={classListButton}></button>
    </li>
  );
}

export default MoviesCard;