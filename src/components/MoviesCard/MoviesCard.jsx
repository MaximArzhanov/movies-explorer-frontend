import React from 'react';
import './MoviesCard.css';
import moviePicture from '../../images/movie-picture-1.png'

function MoviesCard() {

  return (
    <article className="movies-card">
        <figure className="movie">
            <figcaption className="movie__title">
                В погоне за Бенкси
            </figcaption>
            <span className="movie__duration">27 минут</span>
            <img src={moviePicture} alt="Постер к фильму" className="movie__picture" />
        </figure>
        <button className="movies-card__button movies-card__button_saved"></button>
    </article>
  );
}

export default MoviesCard;